# BenVanderberg.com

Personal site — static, client-side, deployed via git commit.

- **Framework:** [Astro](https://astro.build) with the React integration
- **Content:** Markdown files in `src/content/blog/` (typed content collection)
- **Styling:** Hand-written CSS, black & white aesthetic
- **Output:** Pure static HTML/CSS/JS in `./dist/` — host anywhere

## Sections

- `/` — Home (hero + recent posts)
- `/about/` — About
- `/blog/` — Blog index (auto-generated from `src/content/blog/*.md`)
- `/apps/` — Apps (edit `src/site.config.ts`)
- `/plugins/` — Plugins (edit `src/site.config.ts`)

## Writing a post

Drop a new `.md` file into `src/content/blog/`:

```md
---
title: "Post title"
description: "Short summary used on listing pages and meta tags."
pubDate: 2026-06-25
heroImage: "/images/my-image.jpg"  # optional, image lives in public/
draft: false                        # set true to hide
---

Your post body in Markdown.
```

The filename (sans `.md`) becomes the URL slug: `src/content/blog/my-post.md` → `/blog/my-post/`.

Images referenced from posts can live in `public/` (served at site root) or alongside the post.

## Commands

| Command           | What it does                              |
| :---------------- | :---------------------------------------- |
| `npm install`     | Install dependencies                      |
| `npm run dev`     | Local dev server at `localhost:4321`      |
| `npm run build`   | Build static site to `./dist/`            |
| `npm run preview` | Serve the built site locally              |

Requires **Node ≥ 22.12**. If you use nvm: `nvm use 22`.

## Deploy

`npm run build` produces a static `dist/` folder. Push the repo and point any static host at it (GitHub Pages, Netlify, Vercel, Cloudflare Pages, S3 + CloudFront — all work).

## Project structure

```
src/
├── components/        # Header, Footer (.astro)
├── content/
│   └── blog/          # Markdown posts go here
├── layouts/           # BaseLayout, BlogPostLayout
├── pages/             # File-based routes
│   ├── index.astro
│   ├── about.astro
│   ├── apps.astro
│   ├── plugins.astro
│   └── blog/
│       ├── index.astro
│       └── [...slug].astro
├── styles/global.css
├── content.config.ts  # Content collection schema
└── site.config.ts     # Nav, apps, plugins
public/                # Static assets (favicon, images)
```
