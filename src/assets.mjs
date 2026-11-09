import { escapeHtml } from './render.mjs';

export const styles = `
:root { color-scheme: dark; font-family: Inter, ui-sans-serif, system-ui, sans-serif; background: #0b0f14; color: #f4f1e8; }
* { box-sizing: border-box; }
body { margin: 0; min-height: 100vh; background: radial-gradient(circle at 80% 10%, color-mix(in srgb, var(--accent) 13%, transparent), transparent 34rem), #0b0f14; }
a { color: inherit; }
.site-header { display: flex; align-items: center; justify-content: space-between; gap: 2rem; padding: 1.25rem clamp(1rem, 4vw, 4rem); border-bottom: 1px solid #ffffff1c; }
.brand { font-weight: 800; letter-spacing: -.04em; text-decoration: none; }
nav { display: flex; flex-wrap: wrap; gap: .8rem; }
nav a { color: #cbc8bf; font-size: .8rem; text-decoration: none; }
nav a[aria-current='page'] { color: var(--accent); }
.hero { width: min(78rem, calc(100% - 2rem)); margin: 0 auto; padding: clamp(5rem, 12vw, 10rem) 0; }
.eyebrow { color: var(--accent); font-size: .78rem; font-weight: 800; letter-spacing: .16em; text-transform: uppercase; }
h1 { max-width: 16ch; margin: .7rem 0 1.5rem; font-size: clamp(3rem, 8vw, 7.5rem); letter-spacing: -.065em; line-height: .9; }
.lede { max-width: 45rem; color: #c5c2b8; font-size: clamp(1.1rem, 2.3vw, 1.45rem); line-height: 1.65; }
.status { display: flex; flex-wrap: wrap; gap: .5rem 1rem; margin-top: 3rem; padding: 1rem 1.25rem; border: 1px solid color-mix(in srgb, var(--accent) 42%, #ffffff1a); border-radius: 1rem; background: #ffffff08; }
.status strong { color: var(--accent); }
footer { display: flex; justify-content: space-between; gap: 1rem; padding: 2rem clamp(1rem, 4vw, 4rem); border-top: 1px solid #ffffff1c; color: #8e8b84; font-size: .85rem; }
@media (max-width: 58rem) { .site-header { align-items: flex-start; flex-direction: column; } nav { gap: .65rem 1rem; } }
`;

export const siteScript = `document.documentElement.classList.add('js');`;

export function favicon(site) {
  const letter = escapeHtml(site.name.slice(0, 1));
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="15" fill="#0b0f14"/><path d="M13 13h38v38H13z" fill="none" stroke="${escapeHtml(site.accent)}" stroke-width="3"/><text x="32" y="41" text-anchor="middle" font-family="system-ui" font-size="28" font-weight="800" fill="#f4f1e8">${letter}</text></svg>`;
}

export const headers = `/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  X-Frame-Options: DENY
`;

export const redirects = `/index.html  /  301
`;
