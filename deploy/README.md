# Demo deployment (GitHub Pages)

The two **static** showcases are deployed to GitHub Pages on the `gh-pages`
branch, served at:

- **Landing:** https://zied-snoussi.github.io/bysur-suite-demo/
- **React (shadcn):** https://zied-snoussi.github.io/bysur-suite-demo/react/
- **Angular (spartan):** https://zied-snoussi.github.io/bysur-suite-demo/angular/

> The Next.js app (`apps/web`) is a full Better-T-Stack app with a server, so it
> isn't part of the static Pages deploy — run it locally with `pnpm dev`. The
> `/react` showcase already demonstrates the same shadcn components.

## Redeploy

The `@zied-snoussi/*` packages are private, so the build needs a token with
`read:packages`. Deploying from your machine (which already has `gh` auth) is the
simplest path — no CI secret required:

```bash
export GITHUB_TOKEN=$(gh auth token)

# 1) build both static showcases with the right base paths
pnpm --filter react-vite exec vite build --base=./
pnpm --filter angular   exec ng build --base-href /bysur-suite-demo/angular/

# 2) assemble the site
rm -rf /tmp/demo-site && mkdir -p /tmp/demo-site/react /tmp/demo-site/angular
cp deploy/index.html /tmp/demo-site/index.html
touch /tmp/demo-site/.nojekyll
cp -r apps/react-vite/dist/*        /tmp/demo-site/react/
cp -r apps/angular/dist/browser/*   /tmp/demo-site/angular/

# 3) publish to the gh-pages branch
cd /tmp/demo-site
git init -b gh-pages && git add -A && git commit -m "deploy demos"
git push -f "https://x-access-token:$(gh auth token)@github.com/zied-snoussi/bysur-suite-demo.git" gh-pages
```

To automate this in GitHub Actions instead, add a repo secret with a PAT that has
`read:packages` (the built-in `GITHUB_TOKEN` can't read packages published from
another repo) and wire it into an `actions/deploy-pages` workflow.
