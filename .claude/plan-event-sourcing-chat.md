# Plan: Event-Sourced Chat System via Terminal

## Context
The portfolio has a placeholder terminal component. The user wants to add a real-time chat system accessed through terminal commands, backed by an event sourcing database (PostgreSQL). This is a learning project — the architecture should clearly demonstrate event sourcing patterns (immutable event store, projections, rebuild).

## Database Schema

### Naming Convention
- **DB columns:** snake_case (`aggregate_id`, `event_type`, `created_at`)
- **JS objects:** camelCase (`aggregateId`, `eventType`, `createdAt`)
- A mapping utility converts between the two layers

**Event store** (append-only, immutable, single source of truth):
```sql
CREATE TABLE event_store (
  id             BIGSERIAL PRIMARY KEY,          -- global insertion order for full replays
  version        INTEGER NOT NULL,               -- per-aggregate order (1, 2, 3...)
  aggregate_id   VARCHAR(255) NOT NULL,          -- domain entity ID, e.g. "chat-...", "user-...", "chatMessage-..."
  event_type     VARCHAR(255) NOT NULL,
  payload        JSONB NOT NULL,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT unique_aggregate_version UNIQUE (aggregate_id, version)
);

CREATE INDEX idx_event_store_aggregate ON event_store (aggregate_id, version);
```

Notes:
- `id` (BIGSERIAL): global ordering across all aggregates, used for full event replay
- `aggregate_id`: the domain entity identifier — format varies by aggregate (`chat-<uuidv7>`, `user-<uuidv7>`, `chatMessage-<uuidv7>`)
- `version`: per-aggregate counter, enables optimistic concurrency and ordered replay of a single entity
- **No updated_at/deleted_at** — events are immutable. Deletions are modeled as new events (e.g. `MessageDeleted`, `ChatDeleted`)

**Projections** (derived, disposable, rebuildable — these DO have updated_at/deleted_at):
```sql
CREATE TABLE users (
  aggregate_id   VARCHAR(255) PRIMARY KEY,       -- user-<uuidv7>
  username       VARCHAR(32) UNIQUE NOT NULL,
  password_hash  VARCHAR(255) NOT NULL,
  created_at     TIMESTAMPTZ NOT NULL,
  deleted_at     TIMESTAMPTZ
);

CREATE TABLE rooms (
  aggregate_id   VARCHAR(255) PRIMARY KEY,       -- chat-<uuidv7>
  name           VARCHAR(255) UNIQUE NOT NULL,
  created_by     VARCHAR(255) NOT NULL REFERENCES users(aggregate_id),
  created_at     TIMESTAMPTZ NOT NULL,
  updated_at     TIMESTAMPTZ,
  deleted_at     TIMESTAMPTZ,
  member_count   INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE room_members (
  chat_id        VARCHAR(255) NOT NULL REFERENCES rooms(aggregate_id),
  user_id        VARCHAR(255) NOT NULL REFERENCES users(aggregate_id),
  joined_at      TIMESTAMPTZ NOT NULL,
  PRIMARY KEY (chat_id, user_id)
);

CREATE TABLE messages (
  aggregate_id   VARCHAR(255) PRIMARY KEY,       -- chatMessage-<uuidv7>
  chat_id        VARCHAR(255) NOT NULL REFERENCES rooms(aggregate_id),
  user_id        VARCHAR(255) NOT NULL REFERENCES users(aggregate_id),
  content        TEXT NOT NULL,
  sent_at        TIMESTAMPTZ NOT NULL,
  deleted_at     TIMESTAMPTZ
);
```

## Base Classes

### AbstractEvent (`server/events/AbstractEvent.js`)

Base class for all domain events. Not instantiated directly.

```js
class AbstractEvent {
  aggregateId    // e.g. "chat-<uuidv7>"
  version        // per-aggregate sequence number
  eventType      // e.g. "ChatCreated"
  payload        // event-specific data
  createdAt      // timestamp

  constructor(aggregateId, payload) { ... }
  serialize()    // → plain object for event store
}
```

### AbstractAggregate (`server/aggregates/AbstractAggregate.js`)

Base class for all aggregates. Shared logic for event replay and raising.

```js
class AbstractAggregate {
  aggregateId
  version = 0
  pendingEvents = []

  // Rebuild from event stream
  static fromEvents(aggregateId, events) { ... }

  // Apply event to internal state (subclasses override)
  apply(event) { ... }

  // Internal: create event + apply it + add to pendingEvents
  raise(EventClass, payload) { ... }
}
```

## Aggregates

Three aggregates, each with their own event stream:

| Aggregate | ID format | Events | Responsibility |
|---|---|---|---|
| **User** | `user-<uuidv7>` | `UserCreated` | User identity + auth |
| **Chat** | `chat-<uuidv7>` | `ChatCreated`, `ChatDeleted`, `UserJoined`, `UserLeft` | Room lifecycle + membership |
| **ChatMessage** | `chatMessage-<uuidv7>` | `MessageSent`, `MessageDeleted` | Message lifecycle |

## Authentication

**Stack:** bcrypt (password hashing) + JWT (httpOnly cookie)

**New user flow:**
1. Terminal prompts `Username:`
2. User types a name (≤32 chars) → server checks uniqueness
3. Terminal prompts `Password:` (masked input)
4. Terminal prompts `Confirm password:` (masked input)
5. Server hashes password (bcrypt), creates User aggregate (`UserCreated`), sets JWT cookie
6. Logged in — terminal ready

**Returning user flow:**
1. Terminal prompts `Username:`
2. User types existing name → server finds it
3. Terminal prompts `Password:` (masked input)
4. Server verifies bcrypt hash → sets JWT cookie
5. Logged in — terminal ready

**Cookie present:**
- Server verifies JWT → skip login, straight to terminal

**JWT payload:** `{ userId: 'user-<uuidv7>', username }` signed with server `SECRET_KEY`

## Event Types

Each event extends `AbstractEvent`. Payloads reference parent aggregates where needed.

| Event | Aggregate | Payload |
|---|---|---|
| `UserCreated` | User | `{ username, passwordHash }` |
| `ChatCreated` | Chat | `{ roomName, createdBy }` |
| `ChatDeleted` | Chat | `{ deletedBy }` |
| `UserJoined` | Chat | `{ userId }` |
| `UserLeft` | Chat | `{ userId }` |
| `MessageSent` | ChatMessage | `{ chatId, userId, content }` |
| `MessageDeleted` | ChatMessage | `{ deletedBy }` |

## Backend Structure (`server/`)

```
server/
  package.json
  index.js                   # Express + socket.io bootstrap, runs migrations
  aggregates/
    AbstractAggregate.js     # Base class — fromEvents(), apply(), raise()
    User.js                  # User identity + auth (extends AbstractAggregate)
    Chat.js                  # Room lifecycle + membership (extends AbstractAggregate)
    ChatMessage.js           # Message lifecycle (extends AbstractAggregate)
  db/
    pool.js                  # pg Pool from DATABASE_URL
    migrate.js               # Runs schema.sql on startup
    schema.sql               # Event store + projection DDL
    seed.js                  # Reads seed-data.js, appends events, rebuilds projections
    seed-data.js             # Declarative fake data definition (easy to edit)
    reset.js                 # Truncates all tables (event store + projections)
  events/
    AbstractEvent.js         # Base event class
    UserCreated.js           # extends AbstractEvent
    ChatCreated.js           # extends AbstractEvent
    ChatDeleted.js           # extends AbstractEvent
    UserJoined.js            # extends AbstractEvent
    UserLeft.js              # extends AbstractEvent
    MessageSent.js           # extends AbstractEvent
    MessageDeleted.js        # extends AbstractEvent
    eventStore.js            # append(), getStream(), getAllEvents()
    eventTypes.js            # Constants + event class registry
  commands/
    register.js              # Validate username unique + ≤32 chars → User.create() → persist
    login.js                 # Verify bcrypt hash → sign JWT → set cookie
    createRoom.js            # Thin: check uniqueness → Chat.create() → persist
    joinRoom.js              # Thin: load Chat aggregate → chat.join() → persist
    leaveRoom.js             # Thin: load Chat aggregate → chat.leave() → persist
    sendMessage.js           # Thin: load Chat → create ChatMessage → persist
  projections/
    projector.js             # apply(event) + rebuildAll()
    userProjection.js        # Handles User events
    roomProjection.js        # Handles Chat events (rooms + members)
    messageProjection.js     # Handles ChatMessage events
  queries/
    users.js                 # SELECT from users projection
    rooms.js                 # SELECT from rooms projection
    messages.js              # SELECT from messages projection
  routes/
    auth.js                  # REST: POST /api/auth/register, POST /api/auth/login
    chat.js                  # REST: GET /api/chat/rooms, GET /api/chat/events, etc.
  socket/
    handler.js               # socket.io: join/leave rooms, broadcast events
  middleware/
    auth.js                  # Verify JWT cookie, attach user to request
```

### User Aggregate (`server/aggregates/User.js`)

```js
class User extends AbstractAggregate {
  static create(username, passwordHash) { ... }  // raises UserCreated
}
```

### Chat Aggregate (`server/aggregates/Chat.js`)

```js
class Chat extends AbstractAggregate {
  static create(roomName, createdBy) { ... }  // raises ChatCreated
  join(userId) { ... }                         // raises UserJoined
  leave(userId) { ... }                        // raises UserLeft
  delete(deletedBy) { ... }                    // raises ChatDeleted
}
```

### ChatMessage Aggregate (`server/aggregates/ChatMessage.js`)

```js
class ChatMessage extends AbstractAggregate {
  static create(chatId, userId, content) { ... }  // raises MessageSent
  delete(deletedBy) { ... }                        // raises MessageDeleted
}
```

Command flow: **look up aggregate ID → load events → rebuild aggregate → call business method → persist pending events → apply projections**

## API

**REST** (auth + queries + educational endpoints):
- `POST /api/auth/register` — create user (username, password) → set JWT cookie
- `POST /api/auth/login` — verify credentials → set JWT cookie
- `GET /api/auth/me` — current user from JWT (or 401)
- `GET /api/chat/rooms` — list rooms
- `GET /api/chat/rooms/:name/messages?limit=50` — room history
- `GET /api/chat/events/:aggregateId` — raw events (educational)
- `POST /api/chat/projections/rebuild` — wipe & rebuild projections
- `POST /api/chat/db/seed` — clear DB + insert fake data + rebuild projections
- `POST /api/chat/db/reset` — truncate all tables

**WebSocket** (real-time commands, requires valid JWT):
- Client emits: `chat:join`, `chat:leave`, `chat:message`, `chat:create`, `chat:list`
- Server emits: `chat:event`, `chat:welcome`, `chat:error`

## Frontend Changes

**New files:**
- `src/stores/terminalStore.js` — lines[], commandHistory[], currentRoom, user (from JWT), connected
- `src/composables/useTerminalCommands.js` — parse input, dispatch to handlers
- `src/composables/useChatSocket.js` — socket.io-client connection, emit/listen, push events to terminalStore
- `src/composables/useAuth.js` — login/register flows, check `/api/auth/me` on load

**Modified files:**
- `src/components/AppTerminal.vue` — full rewrite: output area + input with prompt, command history (up/down), auto-scroll
- `vite.config.js` — add dev proxy for `/api` and `/socket.io`
- `package.json` (root) — add `socket.io-client`, dev scripts

**Terminal login flow:**
- On open: check JWT cookie via `GET /api/auth/me`
- If not logged in: prompt `Username:` → then `Password:` (masked)
- Server determines register vs login based on whether username exists
- On success: prompt changes to `username@portfolio$`

**Terminal commands (after login):**
- `help` — list commands
- `clear` — clear output
- `chat create <name>` — create room
- `chat join <name>` — join room (prompt changes to `username@portfolio [room]$`)
- `chat list` — list rooms
- `chat leave` — leave room
- When in a room, typing directly sends a message

## Implementation Phases

### Phase 1: Terminal shell (frontend only)
1. Create `terminalStore.js`
2. Create `useTerminalCommands.js` with `help`, `clear`, stubbed `chat` commands
3. Rewrite `AppTerminal.vue` — input, output, history, scrolling
4. Verify: toggle terminal, type commands, see output

### Phase 2: Backend + event store + auth
5. `npm init` in `server/`, install express, socket.io, pg, uuid, bcrypt, jsonwebtoken, cookie-parser
6. Create db/ files (pool, migrate, schema.sql)
7. Create events/ files (AbstractEvent, concrete events, eventStore.js, eventTypes.js)
8. Create `aggregates/AbstractAggregate.js`, `User.js`, `Chat.js`, `ChatMessage.js`
9. Create auth middleware, auth routes (register/login), JWT signing
10. Verify: start server, schema created, register + login via curl

### Phase 3: Commands + projections
11. Create thin command modules (createRoom, joinRoom, leaveRoom, sendMessage)
12. Create projections (projector, userProjection, roomProjection, messageProjection)
13. Create queries (users, rooms, messages)
14. Create REST routes (chat.js)
15. Verify: curl to create rooms, send messages, query projections, rebuild

### Phase 4: WebSocket + frontend integration
16. Create socket handler, wire into server (JWT auth on handshake)
17. Install `socket.io-client`, create `useChatSocket.js`
18. Create `useAuth.js` — login/register flow, `GET /api/auth/me` check
19. Wire terminal login flow + commands to socket composable
20. Add vite proxy config
21. Verify: open two browser tabs, register users, chat between them

### Phase 5: Polish
22. Add dev scripts (`dev:server`, `dev:all`)
23. Add `docker-compose.yml` for PostgreSQL
24. Connection status in terminal prompt
25. Disconnect/reconnect handling

## Seed Data (`server/db/seed-data.js`)

Declarative format — seed script converts to events (creates User aggregates first, then Chat + ChatMessage):

```js
export default {
  users: [
    { username: 'alice', password: 'password123' },
    { username: 'bob', password: 'password123' },
    { username: 'charlie', password: 'password123' },
  ],
  rooms: [
    {
      name: 'general',
      createdBy: 'alice',
      members: ['alice', 'bob', 'charlie'],
      messages: [
        { from: 'alice', content: 'Welcome to the general chat!' },
        { from: 'bob', content: 'Hey everyone!' },
        { from: 'charlie', content: 'Nice portfolio site' },
      ],
    },
  ],
}
```

**NPM scripts** (in `server/package.json`):
- `npm run db:seed` — runs `node db/seed.js`
- `npm run db:reset` — runs `node db/reset.js`
- `npm run db:migrate` — runs `node db/migrate.js`

## Key Design Decisions
- **Three aggregates** (User, Chat, ChatMessage) — each with own event stream, clear separation of concerns
- **AbstractEvent + AbstractAggregate base classes** — shared logic via inheritance, concrete classes stay focused
- **bcrypt + JWT auth** — real authentication, httpOnly cookie, no anonymous visitors
- **Synchronous projections** (applied inline after append) — simpler for learning, `rebuildAll()` demonstrates disposability
- **WebSocket for commands, REST for queries** — commands need broadcast, queries don't
- **Optimistic concurrency** via `UNIQUE(aggregate_id, version)` — teaches core ES concept

## Verification
1. `npm run dev:all` starts both frontend and backend
2. Open terminal → login prompt appears
3. Enter new username + password → user created, logged in
4. `chat create test` → room created
5. `chat join test` → prompt changes, history loaded
6. Type messages → appear in real-time
7. Open second browser tab → login as different user → `chat join test` → see messages from both
8. Close tab, reopen → cookie present, skip login
9. `GET /api/chat/events/user-<uuidv7>` → see UserCreated event
10. `GET /api/chat/events/chat-<uuidv7>` → see room + membership events
11. `POST /api/chat/projections/rebuild` → projections rebuilt from events
