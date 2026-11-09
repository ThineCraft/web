# Cloudflare Pages handoff

This repository builds eight independent static directories from one source. Create one Cloudflare Pages project for each entry in `projects.json`, connect every project to `ThineCraft/web`, and use the listed build command and output directory.

## Shared settings

- Production branch: `main`
- Build command: `npm run build`
- Root directory: repository root
- Node version: 22 or newer
- Build output: the per-project directory from `projects.json`

## Custom domains

Attach the listed custom domain after the corresponding Pages project has completed its first successful deployment. Cloudflare should create or validate the required DNS record and provision TLS.

The repository contains no Cloudflare account IDs, API tokens, GitHub credentials, or DNS-zone identifiers. Authorization and custom-domain activation must be completed in the owning Cloudflare account.

## Why eight projects use one repository

Each subdomain remains independently deployable and can gain its own settings later. The sites still share one generator, design system, navigation model, and content schema, preventing eight near-identical codebases from drifting apart.
