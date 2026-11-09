# ThineCraft web

Public source for the eight planned ThineCraft project websites:

- `thinecraft.io`
- `share.thinecraft.io`
- `drive.thinecraft.io`
- `team.thinecraft.io`
- `gantt.thinecraft.io`
- `flow.thinecraft.io`
- `show.thinecraft.io`
- `form.thinecraft.io`

The sites explain intended open-source projects. They do not claim that working product implementations are available.

## Build

Requires Node.js 22 or newer and no third-party packages.

```text
npm test
npm run build
```

The build recreates `dist/` and writes one complete static site to each `dist/<site-id>/` directory.

## Structure

- `src/sites.mjs` contains the project narratives and canonical domains.
- `src/render.mjs` renders semantic HTML and shared sections.
- `src/assets.mjs` contains the shared visual system, interaction, security headers, and per-site favicon generator.
- `scripts/build.mjs` creates deterministic static outputs.
- `cloudflare/projects.json` maps Cloudflare Pages projects to build outputs and custom domains.
- `test/` protects the site count, content promises, accessibility contract, output shape, and deployment mapping.

## Publishing

Cloudflare Pages is the intended public host. See `cloudflare/README.md` for the eight-project configuration. Source remains in the `ThineCraft` GitHub organization while Cloudflare provides the public domains, TLS, and edge delivery.

## Status and licensing

The repository is public so the project definitions and website work can develop openly. A software license has not yet been selected; public availability alone does not grant an open-source license.
