# /bv-publish

Publish the site: commit + push source, build, deploy dist to the publish repo.

## Repos
- **Source**: https://github.com/benvanderberg/benvanderberg.com (remote `origin`)
- **Publish**: https://github.com/benvanderberg/benvanderberg.com-publish (persistent clone at `/Users/bvanderb/Documents/GitHub/benvanderberg.com-publish/`)

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

A persistent clone of the publish repo lives at `/Users/bvanderb/Documents/GitHub/benvanderberg.com-publish/`. **Never use `dist/.git`** — Astro wipes `dist/` on every build, and running git commands in a gitless `dist/` will walk up and corrupt the source repo's remotes.

```bash
PUBLISH=/Users/bvanderb/Documents/GitHub/benvanderberg.com-publish
DIST=/Users/bvanderb/Documents/GitHub/benvanderberg.com/dist

# Pull latest so we stay fast-forwardable
git -C $PUBLISH pull origin main

# Wipe publish clone contents (preserve .git)
find $PUBLISH -mindepth 1 -maxdepth 1 -not -name '.git' -exec rm -rf {} +

# Copy fresh build output in
cp -R $DIST/. $PUBLISH/

# Commit and push (no force — cPanel needs fast-forward history)
git -C $PUBLISH add -A
git -C $PUBLISH commit -m "Deploy $(date -u '+%Y-%m-%d %H:%M UTC')"
git -C $PUBLISH push origin main
```

## Reporting

After each step, confirm success or surface any error. At the end report:
- Source commit SHA and push status
- Build duration and any warnings
- Deploy commit SHA pushed to the publish repo
