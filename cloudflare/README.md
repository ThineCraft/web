# GitHub Pages and Cloudflare handoff

This repository builds eight independent static directories from one source. Each output is copied to `docs/` in the matching public project repository listed in `projects.json`. GitHub Pages serves `main:/docs`; Cloudflare manages the public DNS zone.

## GitHub Pages settings

- Branch: `main`
- Folder: `/docs`
- Custom domain: the matching domain from `projects.json`
- HTTPS enforcement: enable after GitHub issues the custom-domain certificate

## Cloudflare DNS

- The apex uses GitHub Pages' four documented `A` records and four `AAAA` records.
- `share`, `drive`, `team`, `gantt`, `flow`, `show`, `form`, and `www` are `CNAME` records to `thinecraft.github.io`.
- Keep records DNS-only while GitHub provisions certificates. Proxy them only after all custom domains work over HTTPS.
- When proxying is enabled, use Cloudflare SSL/TLS mode `Full (strict)`.

The repository contains no Cloudflare account IDs, API tokens, GitHub credentials, or DNS-zone identifiers.

## Why the generator remains shared

Each public site lives with its project while the generator, design system, navigation model, and content schema remain centralized here. Rebuild the source, then copy each `dist/<site-id>/` output to the matching repository's `docs/` folder.
