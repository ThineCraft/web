import test from 'node:test';
import assert from 'node:assert/strict';

import { styles, siteScript } from '../src/assets.mjs';
import { renderSite } from '../src/render.mjs';
import { sites } from '../src/sites.mjs';

const html = renderSite(sites[2], sites);

test('renders semantic landmarks and a keyboard skip link', () => {
  assert.match(html, /<a class="skip-link" href="#main">Skip to content<\/a>/);
  assert.match(html, /<header class="site-header">/);
  assert.match(html, /<nav id="project-navigation"[^>]*aria-label="ThineCraft projects"/);
  assert.match(html, /<main id="main">/);
  assert.match(html, /<footer>/);
});

test('provides an accessible mobile navigation control', () => {
  assert.match(html, /<button class="menu-toggle"[^>]*aria-expanded="false"[^>]*aria-controls="project-navigation"/);
  assert.match(siteScript, /aria-expanded/);
});

test('includes visible focus and reduced-motion styling', () => {
  assert.match(styles, /:focus-visible/);
  assert.match(styles, /prefers-reduced-motion:\s*reduce/);
});

test('keeps the decorative crosshair inside its signal container', () => {
  assert.match(styles, /\.signal::after\s*\{\s*width:\s*100%/);
});
