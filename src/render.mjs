const REQUIRED_FIELDS = ['id', 'name', 'domain', 'eyebrow', 'headline', 'summary', 'accent', 'status'];

export function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

export function validateSite(site) {
  for (const field of REQUIRED_FIELDS) {
    if (!site?.[field]) {
      throw new Error(`Site ${site?.id ?? '<unknown>'} is missing required field ${field}`);
    }
  }
  return site;
}

function renderNavigation(allSites, currentId) {
  return allSites
    .map((site) => {
      const current = site.id === currentId ? ' aria-current="page"' : '';
      return `<a href="https://${escapeHtml(site.domain)}"${current}>${escapeHtml(site.name)}</a>`;
    })
    .join('');
}

export function renderSite(site, allSites) {
  validateSite(site);
  allSites.forEach(validateSite);

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(site.name)} · ThineCraft</title>
  <meta name="description" content="${escapeHtml(site.summary)}">
  <link rel="canonical" href="https://${escapeHtml(site.domain)}/">
  <link rel="stylesheet" href="/styles.css">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <script src="/site.js" defer></script>
</head>
<body style="--accent:${escapeHtml(site.accent)}">
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header">
    <a class="brand" href="https://thinecraft.io">ThineCraft</a>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="project-navigation">Projects</button>
    <nav id="project-navigation" class="project-nav" aria-label="ThineCraft projects" data-open="false">${renderNavigation(allSites, site.id)}</nav>
  </header>
  <main id="main">
    <section class="hero">
      <p class="eyebrow">${escapeHtml(site.eyebrow)}</p>
      <h1>${escapeHtml(site.headline)}</h1>
      <p class="lede">${escapeHtml(site.summary)}</p>
      <aside class="status" aria-label="Project status">
        <strong>${escapeHtml(site.status)}</strong>
        <span>No working implementation is provided or implied.</span>
      </aside>
    </section>
  </main>
  <footer><span>${escapeHtml(site.name)}</span><span>Part of the planned ThineCraft ecosystem.</span></footer>
</body>
</html>`;
}
