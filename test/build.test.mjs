import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { buildAll } from '../scripts/build.mjs';

test('builds a complete static directory for every site', async () => {
  const output = await mkdtemp(join(tmpdir(), 'thinecraft-web-'));
  await buildAll(output);

  for (const id of ['home', 'share', 'drive', 'team', 'gantt', 'flow', 'show', 'form']) {
    for (const filename of ['index.html', 'styles.css', 'site.js', 'favicon.svg', '_headers', '_redirects']) {
      const content = await readFile(join(output, id, filename), 'utf8');
      assert.ok(content.length > 0, `${id}/${filename} should not be empty`);
    }
  }
});

test('removes stale output before rebuilding', async () => {
  const output = await mkdtemp(join(tmpdir(), 'thinecraft-web-stale-'));
  await mkdir(join(output, 'obsolete'), { recursive: true });
  await writeFile(join(output, 'obsolete', 'old.html'), 'stale');

  await buildAll(output);

  await assert.rejects(readFile(join(output, 'obsolete', 'old.html'), 'utf8'), /ENOENT/);
});

test('renders product-specific titles into generated HTML', async () => {
  const output = await mkdtemp(join(tmpdir(), 'thinecraft-web-title-'));
  await buildAll(output);

  assert.match(await readFile(join(output, 'share', 'index.html'), 'utf8'), /<title>ShareCraft · ThineCraft<\/title>/);
  assert.match(await readFile(join(output, 'form', 'index.html'), 'utf8'), /<title>FormCraft · ThineCraft<\/title>/);
});
