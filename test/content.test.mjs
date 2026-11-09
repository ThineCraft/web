import test from 'node:test';
import assert from 'node:assert/strict';

import { renderSite } from '../src/render.mjs';
import { sites } from '../src/sites.mjs';

const rendered = Object.fromEntries(sites.map((site) => [site.id, renderSite(site, sites)]));

function includesAll(html, values) {
  for (const value of values) assert.match(html, new RegExp(value, 'i'), `expected page to include ${value}`);
}

test('ShareCraft explains the full SharePoint alternative and co-authoring direction', () => {
  includesAll(rendered.share, ['SharePoint', 'intranet', 'document librar', 'governance', 'WordCraft', 'GridCraft', 'PdfCraft', 'SolidCraft', 'DeckCraft', 'co-authoring', 'workflow integration', 'controlled public submissions']);
});

test('DriveCraft explains hybrid cross-platform migration and continuity', () => {
  includesAll(rendered.drive, ['Zorin OS', 'Windows', 'macOS', 'Microsoft Graph', 'SharePoint', 'ShareCraft', 'PostgreSQL', '100,000', 'offline copy', 'managed metadata']);
});

test('FormCraft explains browser, paper capture, QR anchoring, and optional attestation', () => {
  includesAll(rendered.form, ['PdfCraft', 'ShareCraft', 'QR code', 'alignment anchor', 'video stream', 'panorama', 'read-only', 'OpenTimestamps', 'Bitcoin', 'document hash']);
});

test('every product remains explicitly planned and excluded projects do not appear', () => {
  const combined = Object.values(rendered).join('\n');
  for (const id of ['share', 'drive', 'team', 'gantt', 'flow', 'show', 'form']) {
    assert.match(rendered[id], /Planned capability/);
  }
  for (const excluded of ['TradeCraft', 'ThineWedding', 'ThineMemorial', 'ThineCapture']) {
    assert.doesNotMatch(combined, new RegExp(excluded));
  }
});
