# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

VS Code-inspired portfolio website built with Vue 3, Vite, and Vuetify. The UI simulates a code editor where portfolio sections (home, about, projects, etc.) appear as "files" in a file explorer, opened as tabs.

## Project Structure

Monorepo with `frontend/` and `backend/` directories. Each has its own `package.json` and dependencies.

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

## Architecture

### Layout System
`App.vue` uses CSS Grid with named areas mimicking VS Code: `titlebar`, `sidebar`, `menu`, `tabs`, `editor`, `terminal`, `statusbar`. Mobile (≤640px) collapses to single column with a slide-out menu.

### Component Conventions
- **`App*.vue`** — Layout chrome components (Header, Sidebar, Menu, Tabs, Terminal, Footer, CommandPalette, Logo, Searchbar, ThemeSwitcher)
- **`Base*.vue`** — Reusable UI primitives (Button, Card, FileEntry, FileFolder, Menu, StatusbarMenu, TitlebarMenu, Tooltip)
- All components are **globally registered** via `components/index.js` → `registerComponents()`

### File-as-Data Pattern
Portfolio sections are defined as data objects in `constants/files.js`, not filesystem entries. Each file object has `name`, `language`, and an optional `component` (lazy-imported view). Files with `component: null` appear in the explorer but can't be opened.

### State Management (Pinia)
- **`appStore`** — Manages open files, active file, UI visibility (menu/terminal toggles), and command palette state (isOpen, items, search)
- **`localStorageStore`** — Reactive wrapper around localStorage for persisted preferences (theme)
- **`defaultStore`** — Placeholder store

### Composables
- **`useCommandPalette.js`** — Command palette logic: builds file/theme item lists, filtering, open/close
- **`useStateManager.js`** — State mutation helpers: toggleMenu, toggleTerminal, openFile, closeFile, setActive
- **`useThemeSwitcher.js`** — Theme management: currentTheme computed, setToTheme, auto-apply on startup

### Command Palette
VS Code-style command palette (`AppCommandPalette.vue`) triggered via the searchbar button (`AppSearchbar.vue`), or File menu. Supports custom item arrays (files, themes) with icons, titles, and action callbacks. Theme switching is accessed through `AppThemeSwitcher.vue`, which opens the palette with theme options.

### Theming
Two themes defined in `constants/themes.js` (default dark + legacy). Switched via `composables/useThemeSwitcher.js`, persisted to localStorage, applied through Vuetify's theme system. Colors accessed as `rgb(var(--v-theme-colorName))`.

### Routing
Vue Router initialized in `plugins/router/index.js`. Currently a single route mapping to the HelloWorld view.

### Plugins
App initialization in `main.js` registers plugins from `plugins/`:
- `plugins/pinia/index.js` — Pinia store
- `plugins/router/index.js` — Vue Router
- `plugins/vuetify/index.js` — Vuetify with theme definitions and MDI icons

### Constants
- `files.js` — File objects organized in `src` and `root` folders
- `languages.js` — Language definitions (vue, html, js, json, ts, css, txt, md) with icons and colors
- `themes.js` — Theme color palettes (default dark + legacy)
- `breakpoints.js` — `MOBILE_BREAKPOINT` (640) and `isMobile()` helper

### Adding a New Portfolio Section
1. Create view component in `src/views/`
2. Add entry to `FILES` in `constants/files.js` with `component: () => import('@/views/YourView.vue')`
3. Assign a language from `constants/languages.js` for the file icon

### Environment Variables
```
VITE_APP_TITLE           # Displayed in header
VITE_APP_DEFAULT_THEME   # Theme key: "default" or "legacy"
```

### Responsive Design
Use the `@include mobile { ... }` SCSS mixin from `styles/_breakpoints.scss` (640px breakpoint). JS helper: `isMobile()` from `constants/breakpoints.js`.
