import test from 'node:test';
import assert from 'node:assert/strict';

import { sites } from '../src/sites.mjs';
import { escapeHtml, renderSite, validateSite } from '../src/render.mjs';

test('defines exactly eight unique canonical destinations', () => {
  assert.equal(sites.length, 8);
  assert.equal(new Set(sites.map((site) => site.id)).size, 8);
  assert.equal(new Set(sites.map((site) => site.domain)).size, 8);
  assert.deepEqual(
    sites.map((site) => site.id),
    ['home', 'share', 'drive', 'team', 'gantt', 'flow', 'show', 'form'],
  );
});

test('validation identifies the site and missing field', () => {
  assert.throws(
    () => validateSite({ id: 'broken', name: 'Broken' }),
    /broken.*domain/i,
  );
});

test('validation identifies every renderer-required structured field', () => {
  for (const field of ['thesis', 'features', 'sequence', 'signal']) {
    const broken = { ...sites[1], [field]: undefined };
    assert.throws(() => validateSite(broken), new RegExp(`share.*${field}`, 'i'));
  }
});

test('validation identifies malformed nested feature fields', () => {
  const broken = {
    ...sites[1],
    features: [{ ...sites[1].features[0], body: undefined }],
  };
  assert.throws(() => validateSite(broken), /share.*features\[0\]\.body/i);
});

test('escapes untrusted definition text', () => {
  assert.equal(
    escapeHtml('<script>alert("x")</script> & more'),
    '&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt; &amp; more',
  );
});

test('renders canonical cross-site navigation and planned status', () => {
  const html = renderSite(sites[1], sites);

  assert.match(html, /https:\/\/thinecraft\.io/);
  assert.match(html, /https:\/\/drive\.thinecraft\.io/);
  assert.match(html, /Placeholder project/);
  assert.match(html, /No working implementation is provided or implied/);
});
