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

function renderSignal(site) {
  return `<div class="signal" aria-hidden="true">
    <div class="signal-orbit signal-orbit-one"></div>
    <div class="signal-orbit signal-orbit-two"></div>
    <div class="signal-core"><span>${escapeHtml(site.name.slice(0, 1))}</span></div>
    ${site.signal.map((item, index) => `<span class="signal-label signal-label-${index + 1}">${escapeHtml(item)}</span>`).join('')}
  </div>`;
}

function renderFeatures(site) {
  return site.features.map((feature, index) => `<article class="feature-card">
    <span class="feature-index">0${index + 1}</span>
    <p class="feature-label">${escapeHtml(feature.label)}</p>
    <h3>${escapeHtml(feature.title)}</h3>
    <p>${escapeHtml(feature.body)}</p>
  </article>`).join('');
}

function renderSequence(site) {
  return site.sequence.map((step, index) => `<li>
    <span>${String(index + 1).padStart(2, '0')}</span>
    <strong>${escapeHtml(step)}</strong>
  </li>`).join('');
}

function renderProjectGrid(site, allSites) {
  const visibleSites = site.id === 'home' ? allSites.filter((item) => item.id !== 'home') : allSites.filter((item) => item.id !== site.id).slice(0, 4);
  return visibleSites.map((item) => `<a class="project-card" href="https://${escapeHtml(item.domain)}" style="--card-accent:${escapeHtml(item.accent)}">
    <span>${escapeHtml(item.eyebrow)}</span>
    <strong>${escapeHtml(item.name)}</strong>
    <p>${escapeHtml(item.summary)}</p>
    <i aria-hidden="true">↗</i>
  </a>`).join('');
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
      <div class="hero-copy">
        <p class="eyebrow">${escapeHtml(site.eyebrow)}</p>
        <h1>${escapeHtml(site.headline)}</h1>
        <p class="lede">${escapeHtml(site.summary)}</p>
        <aside class="status" aria-label="Project status">
          <strong>${escapeHtml(site.status)}</strong>
          <span>No working implementation is provided or implied.</span>
        </aside>
      </div>
      ${renderSignal(site)}
    </section>
    <section class="thesis-section section-shell" aria-labelledby="thesis-title">
      <p class="section-kicker">The proposition</p>
      <h2 id="thesis-title">Built to remain understandable—and yours.</h2>
      <p>${escapeHtml(site.thesis)}</p>
    </section>
    <section class="capabilities section-shell" aria-labelledby="capabilities-title">
      <div class="section-heading">
        <p class="section-kicker">Proposed scope</p>
        <h2 id="capabilities-title">What ${escapeHtml(site.name)} is intended to make possible.</h2>
      </div>
      <div class="feature-grid">${renderFeatures(site)}</div>
    </section>
    <section class="sequence-section section-shell" aria-labelledby="sequence-title">
      <div>
        <p class="section-kicker">The shape of the work</p>
        <h2 id="sequence-title">A simple path through a complex system.</h2>
      </div>
      <ol>${renderSequence(site)}</ol>
    </section>
    <section class="ecosystem section-shell" aria-labelledby="ecosystem-title">
      <div class="section-heading">
        <p class="section-kicker">One connected craft</p>
        <h2 id="ecosystem-title">${site.id === 'home' ? 'Explore the planned projects.' : 'Continue through the ecosystem.'}</h2>
      </div>
      <div class="project-grid">${renderProjectGrid(site, allSites)}</div>
    </section>
    <section class="source-cta section-shell">
      <p class="section-kicker">Open from the beginning</p>
      <h2>The source and the conversation belong in public.</h2>
      <p>This site documents an intended direction. Follow the repository as the project definition, architecture, and implementation take shape.</p>
      <a href="https://github.com/ThineCraft/${site.id === 'home' ? 'web' : escapeHtml(site.name)}">View on GitHub <span aria-hidden="true">↗</span></a>
    </section>
  </main>
  <footer><span>${escapeHtml(site.name)}</span><span>Part of the planned ThineCraft ecosystem.</span></footer>
</body>
</html>`;
}
