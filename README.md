Ecwid Demo Storefront by Yuri Aralkin

A storefront demo app built for Ecwid test assignment with React 19, Vite 7, Mantine 8, TanStack Query 5, React Router 7, and Zustand 5.

✅ Requirements

Node.js ≥ 18

npm ≥ 9 — or yarn

📚 Libraries & Why (key dependencies)

React / React DOM — UI runtime.

Vite — fast dev server + build tool.

React Router v7 — client-side routing (/, /product/:id, /cart, /:categoryPath/\*).

Mantine (@mantine/core, @mantine/hooks, @mantine/notifications) — UI system, theming.

@fontsource-variable/inter — local Inter Variable font with font-display: swap.

TanStack React Query v5 (@tanstack/react-query, @tanstack/react-query-devtools) — server state, caching, background refresh.

Zustand 5 — lightweight app state (cart slice).

Axios — HTTP client, typed service layer.

Zod — runtime validation; used with a configurable “guard mode” for API validation strategy.

Immer — immutable updates (optional helper with Zustand or complex reducers).

i18next / react-i18next / i18next-browser-languagedetector — internationalization with auto language detection.

styled-components — for a few custom, highly styled widgets where CSS-in-JS is convenient.

@tabler/icons-react — icon set for UI.

isomorphic-dompurify — safe HTML sanitization (SSR/CSR-capable).

ESLint / Prettier / Husky / lint-staged — code quality, formatting, pre-commit checks.

🚀 Getting Started

# 1) Install dependencies

npm install

# 2) Create an .env from the example

cp .env.example .env

# 3) Run the dev server

npm run start

# 4) Production build & local preview

npm run build
npm run preview

.env.example

# API base URL (adjust or proxy in dev if needed)

VITE_API_BASE_URL=http://localhost:5173/api

# Color scheme key for Mantine localStorage manager

VITE_COLOR_SCHEME_KEY=ecwid-color-scheme

# Zod guard

VITE_ZOD_GUARD_ENABLED=true
VITE_ZOD_GUARD_MODE=warn # one of: throw | warn | silent

🧯 Scripts

From your package.json:

{
"scripts": {
"start": "vite", // dev server
"build": "tsc -b && vite build", // type-check + production build
"preview": "vite preview", // serve built assets
"lint": "eslint .", // lint all sources
"prepare": "husky" // install git hooks
}
}

Pre-commit: husky + lint-staged will run ESLint/Prettier on staged files.
(Ensure you ran git init before the first commit so Husky can install hooks.)

🧱 Project Structure (high level)
src/
api/ # API calls (getProductsList, getProduct, ...)
apiTypes/ # API types (Product, Category, PagedResponse, etc.)
services/ # axios instance, baseURL, interceptors
common/
Layout/ # shared layout with <Outlet/>
components/ # reusable presentational components
hooks/ # custom hooks
pages/ # Root pages with inner hooks and components
ProductsCatalog/  
 ProductPage/
CartPage/
queries/ # API queries hooks
store/ # Store powered by zustand with slice pattern structure and selectors for usage
slices/ # Store slices
style/ # global styles
locales/ # App translation
i18n.ts # i18next setup
App.tsx
main.tsx

🧭 Architecture Notes

UI & Theming:

MantineProvider enables CSS variables and theme.

Font stack uses Inter Variable with robust system fallbacks.

Color scheme is persisted via localStorageColorSchemeManager with key from VITE_COLOR_SCHEME_KEY.

Data Fetching (Server State):

TanStack Query v5 for fetching/cache/invalidation.

Each API call has a dedicated hook in src/queries/\*.

You can enable Suspense in Query if you choose (suspense: true) and wrap parts of the tree in <Suspense>.

App State:

Zustand 5 for local app state (cart).

Immer is available to simplify immutable updates if needed.

Validation:

Zod-based validation with a configurable guard mode:

throw: hard fail

warn: console warn but continue

silent: no output (for perf/production scenarios)

i18n:

i18next with language detector and namespaced JSON resources in locales/{en,ru}.

Default language & fallbacks set in i18n.ts.

Styling:

Mantine components for most UI.

styled-components for specialized widgets where scoped CSS-in-JS helps.

Security:

isomorphic-dompurify to sanitize any HTML coming from the API before rendering.

Performance:

Consider React.lazy for routes and heavy widgets; wrap with <Suspense fallback={<Loader/>}>.

Use Query caching (staleTime) to avoid refetch storms; configure in queries/config.ts.

🧹 Code Quality

ESLint with eslint-plugin-react-hooks and eslint-plugin-react-refresh.

Prettier with prettier-plugin-packagejson.

Husky + lint-staged:

On commit, runs ESLint/Prettier only on staged files.

🗺️ Roadmap (nice-to-haves)

Add unit tests (Vitest) and component tests (Testing Library).

Setup CI (lint + typecheck + build).

Thanks for reviewing!
