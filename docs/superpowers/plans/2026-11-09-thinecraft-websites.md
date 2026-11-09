# ThineCraft Websites Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build eight coordinated, independently deployable static sites for the ThineCraft ecosystem.

**Architecture:** A dependency-free Node.js generator reads structured site definitions, renders shared semantic components, and writes one static output directory per domain. Cloudflare Pages projects can deploy individual outputs from the same GitHub repository.

**Tech Stack:** Node.js 22+, `node:test`, HTML5, CSS, minimal browser JavaScript, inline SVG

**Spec:** `docs/superpowers/specs/2026-11-09-thinecraft-websites-design.md`

## Global Constraints

- Build exactly eight destinations: ThineCraft, ShareCraft, DriveCraft, TeamCraft, GanttCraft, FlowCraft, ShowCraft, and FormCraft.
- Exclude TradeCraft, ThineWedding, ThineMemorial, and ThineCapture as standalone sites.
- Describe all product functionality as planned, intended, or proposed.
- Emit plain static assets with no runtime service dependency.
- Support responsive layouts from 360 px upward, visible keyboard focus, reduced motion, and semantic landmarks.
- Keep Cloudflare authorization and DNS changes outside source implementation.

## Review Focus

- A product definition missing a required field must fail with a clear site ID in the error.
- Generated URLs and cross-site navigation must use the canonical custom domains, not local output paths.
- Product copy must not omit the placeholder status or accidentally claim released functionality.
- The build must remove stale output so deleted pages cannot remain deployed.
- HTML escaping must prevent site-definition text from becoming executable markup.

---

### Task 1: Generator contract and site definitions

**Files:**
- Create: `package.json`
- Create: `src/sites.mjs`
- Create: `src/render.mjs`
- Test: `test/render.test.mjs`

**Interfaces:**
- Produces: `sites: SiteDefinition[]`, `validateSite(site)`, `escapeHtml(value)`, and `renderSite(site, allSites)`.

- [ ] **Step 1: Write failing tests for eight unique site definitions, required-field validation, HTML escaping, canonical navigation, and placeholder status rendering.**
- [ ] **Step 2: Run `npm test` and verify failure because generator modules do not exist.**
- [ ] **Step 3: Implement the minimal site schema, definitions, validation, escaping, and semantic renderer required by the tests.**
- [ ] **Step 4: Run `npm test` and verify all Task 1 tests pass.**

### Task 2: Static build and deployment outputs

**Files:**
- Create: `scripts/build.mjs`
- Create: `src/assets.mjs`
- Test: `test/build.test.mjs`

**Interfaces:**
- Consumes: `sites` and `renderSite(site, allSites)` from Task 1.
- Produces: `buildAll(outputRoot)` that recreates `dist/<site-id>/` with `index.html`, `styles.css`, `site.js`, `favicon.svg`, `_headers`, and `_redirects`.

- [ ] **Step 1: Write failing tests for complete outputs, stale-output removal, per-site titles, and safe static asset generation.**
- [ ] **Step 2: Run `npm test` and verify the build tests fail because `buildAll` is missing.**
- [ ] **Step 3: Implement deterministic static generation and shared asset emission.**
- [ ] **Step 4: Run `npm test` and verify the full suite passes.**

### Task 3: Shared visual system and responsive interaction

**Files:**
- Modify: `src/assets.mjs`
- Modify: `src/render.mjs`
- Test: `test/accessibility.test.mjs`

**Interfaces:**
- Consumes: renderer and emitted asset contract from Tasks 1-2.
- Produces: accessible project switcher, responsive navigation, product motifs, focus states, and reduced-motion behavior.

- [ ] **Step 1: Write failing structural tests for landmarks, skip link, navigation labels, menu control attributes, reduced-motion CSS, and focus-visible styling.**
- [ ] **Step 2: Run `npm test` and verify the accessibility tests fail for the missing behavior.**
- [ ] **Step 3: Implement the shared design and minimal menu behavior without adding runtime dependencies.**
- [ ] **Step 4: Run `npm test` and verify the full suite passes.**

### Task 4: Product narratives and cross-ecosystem story

**Files:**
- Modify: `src/sites.mjs`
- Modify: `src/render.mjs`
- Test: `test/content.test.mjs`

**Interfaces:**
- Consumes: `SiteDefinition` schema and renderer.
- Produces: substantive home, ShareCraft, DriveCraft, TeamCraft, GanttCraft, FlowCraft, ShowCraft, and FormCraft pages matching the design specification.

- [ ] **Step 1: Write failing content tests for all established product requirements and explicit exclusions.**
- [ ] **Step 2: Run `npm test` and verify failures identify the missing narratives.**
- [ ] **Step 3: Add complete site content and product-specific visual data.**
- [ ] **Step 4: Run `npm test` and verify the full suite passes.**

### Task 5: Cloudflare handoff and browser verification

**Files:**
- Create: `README.md`
- Create: `cloudflare/README.md`
- Create: `cloudflare/projects.json`
- Test: `test/deployment.test.mjs`

**Interfaces:**
- Consumes: `dist/<site-id>/` output contract.
- Produces: exact build command, output directory, and custom-domain mapping for eight Cloudflare Pages projects.

- [ ] **Step 1: Write failing tests that validate all eight domain-to-output mappings and reject unknown site IDs.**
- [ ] **Step 2: Run `npm test` and verify failure because deployment metadata is missing.**
- [ ] **Step 3: Add contributor documentation and Cloudflare project mappings without credentials or account-specific IDs.**
- [ ] **Step 4: Run `npm test` and `npm run build`; verify eight complete static outputs and zero test failures.**
- [ ] **Step 5: Serve the generated output locally and inspect representative desktop and mobile pages in a browser.**
- [ ] **Step 6: Commit the reviewed source to the selected ThineCraft GitHub repository; connect Cloudflare only after its GitHub authorization and DNS targets are confirmed.**

