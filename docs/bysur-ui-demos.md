# Bysur UI demos

Three consumers of the Bysur Suite packages, installed from the **internal GitHub Packages registry** (not workspace links). Together they prove the published artifacts work in the three environments Bysur targets.

| Location | Framework | Consumes | Proves |
| --- | --- | --- | --- |
| `apps/web` → route **`/bysur`** | Next.js 16 (App Router) | `@zied-snoussi/ui` + `@zied-snoussi/tokens` | All 25 components; **Server Component** safety |
| `apps/react-vite` | React 19 + Vite | `@zied-snoussi/ui` | Same package, plain client React |
| `apps/angular` | Angular 20 | `@zied-snoussi/core` + `@zied-snoussi/tokens` | Cross-framework: same components, no React |

---

## Prerequisites

The registry is private. Your `.npmrc` uses `${GITHUB_TOKEN}`, and that token needs the **`read:packages`** scope — a plain `gh` login does **not** include it:

```powershell
gh auth refresh -h github.com -s read:packages
$env:GITHUB_TOKEN = gh auth token
pnpm install
```

Verify before installing:

```powershell
$env:GITHUB_TOKEN.Length     # non-zero
```

---

## `apps/web` — the Next.js showcase

Visit **`/bysur`** (`pnpm dev:web` → http://localhost:3001/bysur).

`src/app/bysur/page.tsx` has **no `"use client"`** — it's a Server Component, and that's the point: 20 of the 25 components render with zero client JavaScript. If any presentational component secretly needed the client, `next build` would fail there.

The five interactive components (`FormBuilder`, `NumberField`, `CurrencyInput`, `Tabs`, `Rating`) sit in `src/app/bysur/InteractiveIsland.tsx`. They already ship `"use client"` inside the package, so importing them server-side is fine — the island exists only because **event handlers can't cross the server/client boundary**. That's a React rule, not a library limitation.

### How the styling is wired (important)

This app already imports Tailwind once, via `@bysur-suite-demo/ui/globals.css`. So `src/index.css` deliberately does **not** import `@zied-snoussi/ui/styles.css` — that file runs its own `@import "tailwindcss"` and would pull Tailwind in a second time.

Instead:

```css
@import "@bysur-suite-demo/ui/globals.css";   /* your shadcn tokens + Tailwind */
@import "@zied-snoussi/tokens/tokens.css";    /* Bysur --color-* variables     */
@import "@zied-snoussi/tokens/dark.css";
@source "../node_modules/@zied-snoussi/ui/dist/**/*.js";
```

Two things to understand:

1. **The tokens are required.** Your shadcn theme defines `--background` / `--primary`; the Bysur components read `--color-background` / `--color-primary`. Different names, so they don't collide — but the Bysur variables must exist or the components render with missing colours.
2. **The `@source` is required.** Tailwind's JIT only scans the globs it's told about, and the shared UI package doesn't list `node_modules`. Without that line, the utility classes used *inside* the published components are never generated and everything looks unstyled.

---

## `apps/react-vite` — the same package, no framework

```bash
pnpm --filter react-vite dev      # http://localhost:5173
```

A standalone Vite app with **no Tailwind of its own**, so it imports the full stylesheet directly — which is the normal path for most consumers:

```tsx
import "@zied-snoussi/ui/styles.css";
```

This proves `@zied-snoussi/ui` isn't secretly coupled to Next.js or to a host Tailwind setup.

---

## `apps/angular` — the cross-framework proof

```bash
pnpm --filter angular dev         # http://localhost:4200
```

Angular can't run React. This app consumes `@zied-snoussi/core` — the **Stencil web components built from the same source** that generates the React wrappers — plus `@zied-snoussi/tokens` for styling. There is no React anywhere in this app.

```ts
// src/main.ts
import { defineCustomElements } from "@zied-snoussi/core/loader";
defineCustomElements();
```

```html
<bysur-button variant="destructive">Cancel policy</bysur-button>
<bysur-status-badge status="active"></bysur-status-badge>
```

`CUSTOM_ELEMENTS_SCHEMA` tells Angular's compiler that `<bysur-*>` are custom elements rather than typos.

### Two honest caveats

- It does **not** use `@zied-snoussi/angular`. That package still ships generated *sources* — `ng-packagr` isn't wired yet — so it can't be consumed from the registry.
- `@zied-snoussi/core` is a **3-component pilot** (Button, Input, StatusBadge). That's why the Angular demo is much smaller than the React ones, and it's the honest current state of the cross-framework work.

See [`docs/CROSS-FRAMEWORK.md`](https://github.com/zied-snoussi/bysur-suite-components/blob/main/docs/CROSS-FRAMEWORK.md) in the library repo for the full trade-off analysis.

---

## Theming

Every app toggles `.dark` on `<html>`. Nothing else changes — the components read CSS variables and the class swaps their values. Identical mechanism in React and Angular.

---

## Troubleshooting

**`401` / `403` / `404` on install** — token missing or lacks `read:packages`.

**Components render unstyled in `apps/web`** — the `@source` line was removed from `src/index.css`, so Tailwind never generated the library's classes.

**Colours look wrong in `apps/web`** — `@zied-snoussi/tokens` isn't imported, so `--color-*` is undefined.

More: [project wiki](https://github.com/zied-snoussi/bysur-suite-components/wiki/Troubleshooting).
