# Lynx Kit docs

The documentation website for Lynx Kit, built with [Rspress](https://rspress.dev).

```bash
pnpm install
pnpm dev        # local dev server
pnpm build      # static site in doc_build
pnpm preview    # preview the production build
```

Set `DOCS_BASE=/lynx-kit/` when the site is served from a sub-path such as GitHub Pages.
`REPO_URL` and `NPM_URL` in `rspress.config.ts` point to the GitHub and npm organizations.

Content lives in `docs/`:

- `docs/guide/`: installation, quick start, styling, troubleshooting, contributing guides
- `docs/apis/`: API reference, one page per component

Inside the monorepo, place this folder at `apps/docs` and move `deploy-docs.yml` to `.github/workflows/`.

## Adding a component

When you publish a new component, add one entry to `theme/components.ts`. The home page install box, the component picker and the "Public Beta" badge count read from that list. Then add its page under `docs/apis/` and a sidebar link in `rspress.config.ts`.

## Home page design

- `theme/HeroArt.tsx`: the dot-matrix lynx. It samples `public/logo-dark.svg` into dots, so changing the logo changes the art.
- `styles/index.css`: all colors and layout. Ink and neutrals are the base; the bolt red `#FE2C55` is only used for small accents.
