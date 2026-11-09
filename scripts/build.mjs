import { mkdir, rm, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { sites } from '../src/sites.mjs';
import { renderSite } from '../src/render.mjs';
import { favicon, headers, redirects, siteScript, styles } from '../src/assets.mjs';

export async function buildAll(outputRoot = resolve('dist')) {
  await rm(outputRoot, { recursive: true, force: true });
  await mkdir(outputRoot, { recursive: true });

  for (const site of sites) {
    const directory = resolve(outputRoot, site.id);
    await mkdir(directory, { recursive: true });
    await Promise.all([
      writeFile(resolve(directory, 'index.html'), renderSite(site, sites), 'utf8'),
      writeFile(resolve(directory, 'styles.css'), styles, 'utf8'),
      writeFile(resolve(directory, 'site.js'), siteScript, 'utf8'),
      writeFile(resolve(directory, 'favicon.svg'), favicon(site), 'utf8'),
      writeFile(resolve(directory, '_headers'), headers, 'utf8'),
      writeFile(resolve(directory, '_redirects'), redirects, 'utf8'),
    ]);
  }

  return sites.map((site) => resolve(outputRoot, site.id));
}

const invokedPath = process.argv[1] ? pathToFileURL(resolve(process.argv[1])).href : '';
if (import.meta.url === invokedPath) {
  const outputs = await buildAll();
  console.log(`Built ${outputs.length} ThineCraft sites in ${fileURLToPath(new URL('../dist/', import.meta.url))}`);
}
