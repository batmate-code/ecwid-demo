# Ecwid Demo app

A demo storefront built for an Ecwid test assignment using **React 19**, **Vite 7**, **Mantine 8**, **TanStack Query 5**, **React Router 7**, **Vitest 3**, and **Zustand 5**.

> Author: **Yuri Aralkin**

---

## Table of Contents

- [Requirements](#requirements)
- [Libraries & Why](#libraries--why)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Project Structure](#project-structure)
- [Architecture Notes](#architecture-notes)
- [Testing](#testing)
- [Code Quality](#code-quality)

---

## Requirements

- **Node.js** ≥ 18
- **npm** ≥ 9 (or yarn)

---

## Libraries & Why

- **React / React DOM** - UI runtime.
- **Vite** - fast dev server + build tool.
- **React Router v7** - client-side routing (`/`, `/product/:id`, `/cart`, `/:categoryPath/*`).
- **Mantine** (`@mantine/core`, `@mantine/hooks`, `@mantine/notifications`) - UI system, theming, notifications.
- **TanStack React Query v5** (`@tanstack/react-query`, `@tanstack/react-query-devtools`) - server state, caching, background refresh.
- **Zustand 5** - lightweight app state with simple access to local storage managed by slice pattern.
- **Axios** - HTTP client with a typed service layer.
- **Zod** - runtime validation; configurable “guard mode” for API validation strategy.
- **Immer** - helper for immutable updates (optional with Zustand/complex reducers).
- **i18next / react-i18next / i18next-browser-languagedetector** - internationalization with auto language detection.
- **styled-components** - scoped CSS-in-JS for a style customization.
- **@fontsource-variable/inter** - Inter variable font (local).
- **@tabler/icons-react** - icon set.
- **isomorphic-dompurify** - Safe HTML sanitization.
- **ESLint / Prettier / Husky / lint-staged** - code quality, formatting, pre-commit checks.
- **Vitest** - testing library.

---

## Getting Started

```bash
# 1) Install dependencies
npm install

# 2) Create your .env from the example
cp .env.example .env

# 3) Run the dev server
npm run start

# 4) Build & preview production bundle
npm run build
npm run preview
```

---

## Environment Variables

Create a `.env` file (you can copy from `.env.example`):

```dotenv
# API connection ID key
VITE_ECWID_STORE_ID=777777777777

# API connection token
VITE_ECWID_PUBLIC_TOKEN=public_tokentokentokentokentokentokentokentoken

# Zod guard configuration
VITE_ZOD_GUARD_ENABLED=true
# one of: throw | warn | silent
VITE_ZOD_GUARD_MODE=warn
```

---

## Scripts

From `package.json`:

```json
{
  "scripts": {
    "start": "vite",
    "build": "tsc --noEmit && vite build",
    "preview": "vite preview",
    "lint": "eslint .",
    "prepare": "husky",
    "preview": "vite preview",
    "start": "vite",
    "test": "vitest",
    "test:ci": "vitest run --coverage --reporter=default",
    "test:cov": "vitest --coverage",
    "test:ui": "vitest --ui"
  }
}
```

> **Pre-commit:** Husky + lint-staged will run ESLint/Prettier on staged files.  
> Ensure you’ve run `git init` so Husky can install hooks.

> **Github-CI:** pipelines are set to launch tests and lints on PR creation or push to Dev\Master branches.
---

## Project Structure

```
src/
  api/                    # API calls
    apiTypes/             # API types
    services/             # axios instance, baseURL, interceptors
  common/
    Layout/               # shared layout
  components/             # reusable components
  hooks/                  # custom hooks
  i18n.ts                 # i18next setup
    locales/              # i18n JSON resources
  pages/                  # route-level pages
    ProductsCatalog/
    ProductPage/
    CartPage/
  queries/                # data-fetching hooks (TanStack Query)
  store/                  # Zustand store (slice pattern) + selectors
    slices/               # store slices
  style/                  # global styles
  types/                  # global typization
  utils/                  # reusable utilities
  zod/                    # zod validator configuration
  tests/                   # Vitest unit tests
  App.tsx
  main.tsx
```

---

## Architecture Notes

<details>
<summary><strong>UI & Theming</strong></summary>

- `MantineProvider` enables CSS variables and theming.
- Color scheme persisted via `localStorageColorSchemeManager`

</details>

<details>
<summary><strong>Data Fetching (Server State)</strong></summary>

- **TanStack Query v5** handles fetching, caching, and invalidation.
- Each API call has a dedicated hook in `src/queries/*`.

</details>

<details>
<summary><strong>App State</strong></summary>

- **Zustand 5** for local app (cart).
- **Immer** can simplify immutable updates when needed.

</details>

<details>
<summary><strong>Validation</strong></summary>

- **Zod** api validation with a configurable guard mode:
  - `throw` - hard fail
  - `warn` - console warn but continue
  - `silent` - no output (perf/production)

</details>

<details>
<summary><strong>i18n</strong></summary>

- **i18next** with language detector and namespaced JSON (`locales/{en,ru}`).
- Default language and fallbacks configured in `i18n.ts`.

</details>

<details>
<summary><strong>Styling</strong></summary>

- **Mantine** for most UI components.
- **styled-components** for targeted, highly custom widgets.

</details>

<details>
<summary><strong>Security</strong></summary>

- **isomorphic-dompurify** to sanitize any API-provided HTML before rendering.

</details>

<details>
<summary><strong>Performance</strong></summary>

- Used useMemo and useCallback hooks to prevent unnecessary re-renders.
- Consider `React.lazy` for routes/heavy widgets; wrap with `<Suspense fallback={<Loader/>}>`.
- Configure Query caching (`staleTime`, etc.) in `queries/config.ts` to reduce refetching.
</details>

---
## Testing

**Stack**: Vitest + @testing-library/react + @testing-library/user-event + JSDOM.

What’s covered with unit tests:
- **utils/**
- **hooks/**
- **store/**
- **services/**
- **queries/**
- **zod/**

---

## Code Quality

- **ESLint** (incl. `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`)
- **Prettier** (incl. `prettier-plugin-packagejson`)
- **Husky + lint-staged** to run ESLint/Prettier on staged files on commit
- **Github CI** to run tests with pipelanes
---


_Thanks for reviewing!_
