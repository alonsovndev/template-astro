# Architecture

Astro renders a static landing page at build time. React handles only the pricing interaction. There is no server adapter, API, database, authentication, or browser router.

## Structure

- `src/pages`: homepage, static 404, and generated robots endpoint
- `src/layouts` and `src/components`: document metadata and shared page framing
- `src/config/site.ts`: typed branding, copy, sample plans, FAQ, and contact address
- `src/features/pricing`: React island and its colocated tests
- `src/styles`: plain CSS tokens and responsive layout
- `public`: local artwork and Cloudflare static asset headers
- `e2e`: browser tests of production output

Use native HTML for static interactions. The FAQ works through `details` and `summary`; navigation uses anchors. The pricing selector uses `client:visible`, so its JavaScript loads when the component enters the viewport. Monthly prices are server-rendered, and controls remain disabled until hydration completes.

## Customization boundaries

Edit the site content first, then adjust sections and CSS as needed. Keep future feature logic in its feature folder. Extract shared utilities only after real repetition. Ant Design, Tailwind, global state, API clients, CMS, and Sentry are not baseline dependencies.

`SITE_URL` is a build-time HTTP(S) origin. It configures canonical/social URLs, sitemap, and robots output. Changing it requires rebuilding the assets.

The baseline decision is recorded in [ADR-001](adr/adr-001-astro-landing-page-baseline.md).
