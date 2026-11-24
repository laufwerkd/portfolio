# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

VS Code-inspired portfolio website built with Vue 3, Vite, and Vuetify. The UI simulates a code editor where portfolio sections (home, about, projects, etc.) appear as "files" in a file explorer, opened as tabs. Page content is German and rendered as normal website UI (not fake code lines); only small touches (comment line in the file's language style, monospace headings) reference code.

## Project Structure

Monorepo with `frontend/` and `backend/` directories. `backend/` is currently empty (only `.env.example`).

## Commands

All frontend commands run from `frontend/`:

```bash
cd frontend
npm run dev      # Dev server with --host (network-accessible)
npm run build    # Production build to dist/
npm run preview  # Preview production build
npm run lint     # ESLint with --fix
npm run format   # Prettier on src/
```

No test framework is configured.

## Code Style

- **No semicolons**, single quotes, 120 char line width (Prettier)
- ESLint 9 flat config with Vue essential rules + Prettier integration
- Vue 3 Composition API (`<script setup>` style)
- Path alias: `@/` → `./frontend/src/`
- **No magic numbers**: reuse Vuetify utility classes (`pa-*`, `ga-*`, `d-flex`, `text-*`, `bg-*`, grid `v-row`/`v-col`). Write custom CSS only when no class exists; put needed numbers in `constants/` (e.g. `layout.js`)
- Use theme colors (`primary`, `secondary`, `lightGrey`, syntax colors like `comment`, `string`, `debug`) instead of hex values, so every theme works
- Site text: plain `-` (no en dashes) and straight `"` quotes
- Privacy: never put address, phone, birth date or current employer on the site

## Architecture

### Layout System
`App.vue` uses flexbox. Title bar and status bar are flat; between them sit rounded "pieces" with `pa-1` around and `ga-1` between: the side piece (sidebar + resizable explorer), the editor piece (tabs, breadcrumbs, line numbers, active view) and the resizable terminal piece. Visibility is driven by `appStore.visibleAreas` (`menu`, `terminal`, `editor`); toggle `d-flex`/`d-none` instead of `v-show` because `d-flex` is `!important`. Mobile (≤640px) hides sidebar, terminal and line numbers and turns the explorer into an overlay.

### Component Conventions
- **`App*.vue`** — Layout chrome components (Header, Sidebar, Menu, Tabs, Terminal, Footer, CommandPalette, Logo, Searchbar, ThemeSwitcher)
- **`Base*.vue`** — Reusable UI primitives (Button, Card, FileEntry, FileFolder, Menu, ResizeHandle, StatusbarMenu, Tag, TitlebarMenu, Tooltip). `BaseTag` renders a tech chip with its icon from `constants/tech.js`
- All components are **globally registered** via `components/index.js` → `registerComponents()`

### File-as-Data Pattern
Portfolio sections are defined as data objects in `constants/files.js`, not filesystem entries. Each file object has `name`, `language`, and an optional `component` (lazy-imported view). Files with `component: null` appear in the explorer but can't be opened.

### State Management (Pinia)
- **`appStore`** — Open/active files, UI visibility (`menu`, `terminal`, `editor`), terminal state (tab, lines, history, introPlayed) and command palette state. Compare `fileState.active` with raw `FILES` objects via `toRaw`
- **`localStorageStore`** — Reactive wrapper around localStorage for persisted preferences (theme)
- **`defaultStore`** — Placeholder store

### Composables
- **`useCommandPalette.js`** — Command palette logic: builds file/theme item lists, filtering, open/close
- **`useStateManager.js`** — State mutation helpers: toggleMenu, toggleTerminal, closeTerminal, toggleEditor, openFile, closeFile, setactive
- **`useTerminal.js`** — Terminal commands (`help`, `ls`, `open`, `echo`, `whoami`, `pwd`, `date`, `theme`, `history`, `exit`, `clear`); add a command by adding an entry to `commands`
- **`useTypewriter.js`** — `type(ref, text)` and `wait(ms)` for typing animations (Home title, terminal intro)
- **`useCopyEmail.js`** — Copies `EMAIL` to the clipboard and exposes `copied` for the "E-Mail Kopiert!" tooltip (no `mailto:` links, to avoid spam)
- **`useThemeSwitcher.js`** — Theme management: currentTheme computed, setToTheme, auto-apply on startup

### Command Palette
VS Code-style command palette (`AppCommandPalette.vue`) triggered via the searchbar button (`AppSearchbar.vue`), or File menu. Supports custom item arrays (files, themes) with icons, titles, and action callbacks. Theme switching is accessed through `AppThemeSwitcher.vue`, which opens the palette with theme options.

### Theming
Themes in `constants/themes.js`: default (Dark), vice, paper (light), nord, gruvbox, legacy. Switched via `composables/useThemeSwitcher.js`, persisted to localStorage, applied through Vuetify's theme system. Colors accessed as `rgb(var(--v-theme-colorName))`.

### Routing
Vue Router is initialized in `plugins/router/index.js` with a single route to `HomeView`, but no `<router-view>` is rendered; views are shown through the file/tab system.

### Plugins
App initialization in `main.js` registers plugins from `plugins/`:
- `plugins/pinia/index.js` — Pinia store
- `plugins/router/index.js` — Vue Router
- `plugins/vuetify/index.js` — Vuetify with theme definitions and MDI icons

### Constants
- `files.js` — File objects organized in `src` and `root` folders
- `languages.js` — Language definitions (vue, html, js, json, ts, css, txt, md) with icons and colors
- `themes.js` — Theme color palettes
- `breakpoints.js` — `MOBILE_BREAKPOINT` (640) and `isMobile()` helper
- `layout.js` — Sizes and durations (menu width, terminal height, resize delay, portrait size, copy feedback)
- `terminal.js` / `typewriter.js` — Terminal tabs, prompt, `whoami` output, typing delays
- `socials.js` — `SOCIALS` (GitHub) and `EMAIL`, shared by sidebar, Home, Contact and README
- `projects.js`, `skills.js`, `experience.js` — Page content data (README view summarizes all of them)
- `tech.js` — `TECH_ICONS` map used by `BaseTag`

Project images live in `src/assets/projects/` as WebP (max 1200px wide).

### Adding a New Portfolio Section
1. Create view component in `src/views/`
2. Add entry to `FILES` in `constants/files.js` with `component: () => import('@/views/YourView.vue')`
3. Assign a language from `constants/languages.js` for the file icon

### Environment Variables
```
VITE_APP_TITLE           # Displayed in header
VITE_APP_DEFAULT_THEME   # Theme key from constants/themes.js, e.g. "default"
```
Both are set in `.github/workflows/deploy.yml` for production builds.

### Deployment
GitHub Actions (`.github/workflows/deploy.yml`) on push to `main`: builds `frontend/` on the runner, copies `dist`, `Dockerfile`, `nginx.conf` and `docker-compose.yml` to the server via scp, then runs `docker compose up -d --build` (nginx container on port 8080, behind Nginx Proxy Manager + Cloudflare). The server does not build or `git pull`.

### Responsive Design
Use the `@include mobile { ... }` SCSS mixin from `styles/_breakpoints.scss` (640px breakpoint). JS helper: `isMobile()` from `constants/breakpoints.js`.
