# ThineCraft Websites Design

## Intent

Create a coordinated public web presence for the eight established ThineCraft projects. The sites explain the open-source vision and planned capabilities without implying that working products already exist.

## Destinations

| Site | Public domain | Role |
| --- | --- | --- |
| ThineCraft | `thinecraft.io` | Ecosystem overview, philosophy, and project directory |
| ShareCraft | `share.thinecraft.io` | Planned open-source SharePoint alternative |
| DriveCraft | `drive.thinecraft.io` | Planned hybrid OneDrive alternative and continuity system |
| TeamCraft | `team.thinecraft.io` | Planned communication, meetings, and collaboration platform |
| GanttCraft | `gantt.thinecraft.io` | Planned project scheduling and resource-management platform |
| FlowCraft | `flow.thinecraft.io` | Planned workflow automation and integration platform |
| ShowCraft | `show.thinecraft.io` | Planned diagrams, animation, BI, and digital-twin platform |
| FormCraft | `form.thinecraft.io` | Planned electronic and paper-form capture platform |

## Audience and experience

The initial audience is prospective contributors, technical decision-makers, and organizations evaluating open, self-hostable alternatives to Microsoft 365 services. Each site should answer: what is this project, why might it matter, how does it fit into ThineCraft, and what is planned next?

The experience should feel like one ecosystem rather than eight unrelated templates. A shared header, project switcher, typography, layout system, footer, and status language connect the sites. Each product receives a distinct accent color, visual motif, and product-specific narrative.

## Content constraints

- Every product capability must be described as planned, intended, or proposed.
- No testimonials, customer counts, performance results, release dates, or implementation claims.
- Every product site displays a prominent placeholder status notice.
- ThineWedding, ThineMemorial, and ThineCapture are services that may be built on ShareCraft, not core product sites.
- TradeCraft is excluded.

## Established product direction

### ShareCraft

An open-source SharePoint alternative for intranets, sites, portals, document libraries, lists, pages, news, search, permissions, governance, and workflow integration. It is intended to support co-authoring and presence with WordCraft, GridCraft, PdfCraft, SolidCraft, DeckCraft, and other compatible applications. Its public-facing side can receive controlled submissions such as FormCraft records.

### DriveCraft

A hybrid open-source OneDrive alternative for Zorin OS/Linux, Windows, and macOS. It connects natively to ShareCraft and to SharePoint/OneDrive through Microsoft Graph; migrates files and managed metadata into ShareCraft or SharePoint; maintains an organization-controlled offline copy on a server, NAS, or private infrastructure; exposes metadata, migration, synchronization, and recovery state; and uses local PostgreSQL to track more than 100,000 files.

### FormCraft

A forms and paper-capture system integrated with PdfCraft and ShareCraft. PdfCraft provides fillable PDFs, browser filling, and read-only viewing. Each printed form instance uses a QR code as an opaque ShareCraft-backed identity and alignment anchor. The proposed phone capture experience streams a guided sweep of the printed page, progressively assembles the page, and maps recognized values into the electronic form. Finalized documents may optionally combine digital signatures with an OpenTimestamps proof anchored to Bitcoin; no document contents or personal data are placed on-chain.

### Remaining projects

TeamCraft covers communication and meetings. GanttCraft covers scheduling and resource management. FlowCraft covers workflow automation. ShowCraft covers diagrams, animation, business intelligence, and digital twins. These sites begin with concise product narratives and deliberately avoid inventing implementation detail.

## Architecture

Use a single GitHub repository under the ThineCraft organization. A small dependency-free Node.js static-site generator consumes structured site definitions and shared components, then emits one static directory per destination. Cloudflare can connect eight Pages projects to the same repository and publish the corresponding output directory to each custom domain.

The repository remains portable: generated sites are plain HTML, CSS, SVG, and JavaScript. There is no runtime database, account system, or server dependency in the initial release.

## Visual direction

Use a dark, editorial technology aesthetic with warm ivory text, restrained gradients, crisp grid lines, and product-specific accents. The design should emphasize ownership, continuity, and craft rather than imitate Microsoft branding. Subtle line-art diagrams and CSS/SVG motifs make each product concrete without suggesting screenshots of software that does not exist.

## Accessibility and quality

- Responsive from 360 px upward.
- Semantic landmarks and heading order.
- Keyboard-visible focus states.
- Reduced-motion support.
- Sufficient contrast for body text and controls.
- No content required exclusively through animation or hover.
- Valid internal navigation and canonical domain metadata.

## Deployment

GitHub stores the source under the ThineCraft organization. Cloudflare is the public-facing host, provides TLS and caching, and maps `thinecraft.io` plus the seven product subdomains to independent static outputs. Cloudflare authorization and DNS changes are a separate deployment step after source review.

