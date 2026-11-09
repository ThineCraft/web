import { escapeHtml } from './render.mjs';

export const styles = `
:root { color-scheme: dark; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; background: #090d12; color: #f5f1e7; }
* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { margin: 0; min-height: 100vh; background: radial-gradient(circle at 82% 6%, color-mix(in srgb, var(--accent) 15%, transparent), transparent 32rem), linear-gradient(135deg, #090d12, #0d131a 58%, #090d12); }
body::before { position: fixed; z-index: -1; inset: 0; background-image: linear-gradient(#ffffff08 1px, transparent 1px), linear-gradient(90deg, #ffffff08 1px, transparent 1px); background-size: 4rem 4rem; content: ""; mask-image: linear-gradient(to bottom, black, transparent 70%); }
a { color: inherit; }
a:focus-visible, button:focus-visible { outline: 3px solid var(--accent); outline-offset: 4px; }
.skip-link { position: fixed; z-index: 20; top: .75rem; left: .75rem; padding: .75rem 1rem; border-radius: .5rem; background: var(--accent); color: #07100e; font-weight: 800; transform: translateY(-180%); }
.skip-link:focus { transform: translateY(0); }
.site-header { position: relative; display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 2rem; padding: 1.25rem clamp(1rem, 4vw, 4rem); border-bottom: 1px solid #ffffff1c; background: #090d12cc; backdrop-filter: blur(18px); }
.brand { font-size: 1.05rem; font-weight: 850; letter-spacing: -.05em; text-decoration: none; }
.project-nav { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: .8rem; }
.project-nav a { padding: .35rem .15rem; color: #c7c4ba; font-size: .77rem; font-weight: 700; text-decoration: none; }
.project-nav a:hover, .project-nav a[aria-current='page'] { color: var(--accent); }
.menu-toggle { display: none; padding: .55rem .75rem; border: 1px solid #ffffff2b; border-radius: .55rem; background: #ffffff08; color: #f5f1e7; font: inherit; font-size: .8rem; font-weight: 800; }
.hero { width: min(78rem, calc(100% - 2rem)); margin: 0 auto; padding: clamp(5rem, 12vw, 10rem) 0; }
.eyebrow { color: var(--accent); font-size: .75rem; font-weight: 850; letter-spacing: .17em; text-transform: uppercase; }
h1 { max-width: 16ch; margin: .7rem 0 1.5rem; font-size: clamp(3.1rem, 8vw, 7.6rem); letter-spacing: -.068em; line-height: .89; text-wrap: balance; }
.lede { max-width: 46rem; color: #c6c2b7; font-size: clamp(1.1rem, 2.3vw, 1.46rem); line-height: 1.66; }
.status { display: flex; flex-wrap: wrap; gap: .5rem 1rem; margin-top: 3rem; padding: 1rem 1.25rem; border: 1px solid color-mix(in srgb, var(--accent) 42%, #ffffff1a); border-radius: 1rem; background: #ffffff08; box-shadow: 0 1.5rem 5rem #0005; }
.status strong { color: var(--accent); }
footer { display: flex; justify-content: space-between; gap: 1rem; padding: 2rem clamp(1rem, 4vw, 4rem); border-top: 1px solid #ffffff1c; color: #8f8b82; font-size: .85rem; }
@media (max-width: 62rem) {
  .site-header { grid-template-columns: 1fr auto; }
  .js .menu-toggle { display: inline-flex; }
  .project-nav { grid-column: 1 / -1; justify-content: flex-start; }
  .js .project-nav[data-open='false'] { display: none; }
  .js .project-nav[data-open='true'] { display: flex; }
}
@media (max-width: 38rem) {
  .project-nav { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); width: 100%; }
  h1 { font-size: clamp(2.85rem, 17vw, 4.5rem); }
  footer { flex-direction: column; }
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { scroll-behavior: auto !important; transition-duration: .01ms !important; animation-duration: .01ms !important; animation-iteration-count: 1 !important; }
}
`;

export const siteScript = `
document.documentElement.classList.add('js');
const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#project-navigation');
if (toggle && navigation) {
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    navigation.dataset.open = String(!expanded);
  });
}
`;

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
