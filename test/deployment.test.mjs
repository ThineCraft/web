import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

import { sites } from '../src/sites.mjs';

async function projectMappings() {
  return JSON.parse(await readFile(new URL('../cloudflare/projects.json', import.meta.url), 'utf8'));
}

test('maps every canonical domain to one known static output', async () => {
  const mappings = await projectMappings();
  const expectedIds = sites.map((site) => site.id).sort();

  assert.deepEqual(mappings.projects.map((project) => project.siteId).sort(), expectedIds);
  assert.deepEqual(mappings.projects.map((project) => project.domain).sort(), sites.map((site) => site.domain).sort());
  for (const project of mappings.projects) {
    assert.equal(project.buildCommand, 'npm run build');
    assert.equal(project.outputDirectory, `dist/${project.siteId}`);
  }
});

test('contains no unknown or duplicate Cloudflare project site IDs', async () => {
  const mappings = await projectMappings();
  const known = new Set(sites.map((site) => site.id));
  const ids = mappings.projects.map((project) => project.siteId);

  assert.equal(ids.length, new Set(ids).size);
  assert.deepEqual(ids.filter((id) => !known.has(id)), []);
});
