# Installing and using `@zied-snoussi/ui`

`@zied-snoussi/ui` is a **private** package published to GitHub Packages (not npmjs.org),
separate from this monorepo's own local `@bysur-suite-demo/ui` workspace package. It requires
GitHub authentication to install.

## 1. Files involved

| File | Change | Purpose |
|---|---|---|
| `.npmrc` (repo root) | added | Maps the `@zied-snoussi` scope to GitHub Packages and points the registry's auth token at an env var. Contains no secret, so it's committed. |
| `apps/web/package.json` | added dependency | Declares `"@zied-snoussi/ui": "0.5.0"` under `dependencies`. |
| `pnpm-lock.yaml` | updated by `pnpm install` | Records the resolved version/integrity hash once install succeeds. |

### `.npmrc` (repo root, committed)

```ini
@zied-snoussi:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

**Why this is safe to commit / not gitignored:** it holds no literal secret, only an
`${GITHUB_TOKEN}` placeholder that npm/pnpm substitutes from the environment at install time.
This is the standard pattern for private GitHub Packages in a shared repo — it keeps the registry
config in version control (so every teammate and CI job gets it automatically) while the actual
credential stays out of git entirely.

**Where the real token lives:** in the `GITHUB_TOKEN` environment variable, set per-machine/per-CI-job
— never in a file that's part of this repo:
- **Locally:** export it in your shell profile (`~/.bashrc`, `~/.zshrc`, PowerShell `$PROFILE`, etc.), or
  keep it in a local `.env` that your shell sources — `.env` is already gitignored here.
- **CI:** set it as a secret in the pipeline (e.g. GitHub Actions `secrets.GITHUB_TOKEN`-style repo/org secret)
  and export it into the job's environment before `pnpm install` runs.

The token must be a GitHub PAT with:
- `read:packages` scope
- Access to the repo/org that publishes `@zied-snoussi/ui` (SSO-authorized / collaborator access if the source repo is private)

If you'd rather not rely on env-var interpolation, the alternative is a literal
`//npm.pkg.github.com/:_authToken=<token>` line in your **global** `~/.npmrc` (outside the repo).
That also works, but doesn't travel with the repo for CI/teammates the way the env-var version does.

## 2. Install steps

1. Root `.npmrc` already has the scope mapping + env-var token line (see above).
2. Set `GITHUB_TOKEN` in your environment to a valid PAT (see "Where the real token lives" above).
3. Add the dependency to `apps/web/package.json`:
   ```json
   "@zied-snoussi/ui": "0.5.0"
   ```
4. From the repo root, install:
   ```bash
   pnpm install --filter web...
   ```

If the token doesn't have access to the package's source repo, this fails with
`ERR_PNPM_FETCH_401 Unauthorized` — regenerate/authorize the token and retry.

## 3. Usage in the web app

Import the stylesheet once at the app root — `apps/web/src/index.css` already imports the local
`@bysur-suite-demo/ui` styles the same way:

```css
/* apps/web/src/index.css */
@import "@bysur-suite-demo/ui/globals.css";
@import "@zied-snoussi/ui/styles.css";
```

Then import components anywhere in the app, either from the package root or a subpath:

```tsx
import { Button, Card } from "@zied-snoussi/ui";
// or
import { Button } from "@zied-snoussi/ui/button";
```

Peer dependencies (`react` / `react-dom` `^19`) are already satisfied by this monorepo's catalog
versions, so no extra install is needed for those.

## 4. Available components

- **Layout & content:** `Card` (+ header/title/description/content/footer), `Alert` (+ title/description), `Avatar` (+ image/fallback), `Separator`, `Skeleton`, `Spinner`, `Badge`
- **Forms:** `Button`, `Input`, `Textarea`, `Label`, `Checkbox`, `Switch`, `FormBuilder` (schema-driven form with validation)
- **Utility:** `cn` class-merge helper

Live gallery: https://zied-snoussi.github.io/bysur-suite-components/
