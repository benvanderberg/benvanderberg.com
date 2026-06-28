# /bv-publish

Publish the site: commit + push source, build, deploy dist to the publish repo.

## Repos
- **Source**: https://github.com/benvanderberg/benvanderberg.com (remote `origin`)
- **Publish**: https://github.com/benvanderberg/benvanderberg.com-publish (deploy target, force-pushed)

## Steps

### 1 — Commit & push source

Run `git status` to check for uncommitted changes.

If there are staged or unstaged changes:
- Ask the user for a commit message (or use a sensible default if they provided context).
- Stage the relevant files and commit.
- Push to `origin main`.

If the working tree is clean, skip straight to the build.

Always confirm the push succeeded before continuing.

### 2 — Build

From the project root `/Users/bvanderb/Documents/GitHub/benvanderberg.com`, run:

```bash
source ~/.nvm/nvm.sh && nvm use 23 && npm run build
```

`npm run build` runs `astro build && pagefind --site dist`. Wait for it to finish and confirm there are no errors. If the build fails, stop and report the error — do not attempt the deploy step.

### 3 — Deploy dist/ to publish repo

`dist/` is gitignored from the source repo and acts as an independent git repo:

```bash
cd /Users/bvanderb/Documents/GitHub/benvanderberg.com/dist

# Init if not already a git repo
git init -b main 2>/dev/null || true

# Set remote (add or update)
git remote get-url origin 2>/dev/null \
  && git remote set-url origin https://github.com/benvanderberg/benvanderberg.com-publish.git \
  || git remote add origin https://github.com/benvanderberg/benvanderberg.com-publish.git

# Stage everything, commit, force-push
git add -A
git commit -m "Deploy $(date -u '+%Y-%m-%d %H:%M UTC')"
git push --force origin main
```

Force-push is intentional — the publish repo is a deployment target, not a history-preserving branch.

## Reporting

After each step, confirm success or surface any error. At the end report:
- Source commit SHA and push status
- Build duration and any warnings
- Deploy commit SHA pushed to the publish repo
