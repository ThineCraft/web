import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

import { sites } from '../src/sites.mjs';

async function projectMappings() {
  return JSON.parse(await readFile(new URL('../cloudflare/projects.json', import.meta.url), 'utf8'));
}

test('maps every canonical domain to one known static output', async () => {
  const mappings = await projectMappings();
  const mappedById = new Map(mappings.projects.map((project) => [project.siteId, project]));

  assert.deepEqual([...mappedById.keys()].sort(), sites.map((site) => site.id).sort());
  for (const site of sites) {
    const project = mappedById.get(site.id);
    assert.equal(project.domain, site.domain);
    assert.equal(project.outputDirectory, `dist/${project.siteId}`);
    assert.match(project.repository, /^ThineCraft\/[A-Za-z]+Craft$/);
  }
});

test('contains no unknown or duplicate deployment site IDs', async () => {
  const mappings = await projectMappings();
  const known = new Set(sites.map((site) => site.id));
  const ids = mappings.projects.map((project) => project.siteId);

  assert.equal(ids.length, new Set(ids).size);
  assert.deepEqual(ids.filter((id) => !known.has(id)), []);
});
