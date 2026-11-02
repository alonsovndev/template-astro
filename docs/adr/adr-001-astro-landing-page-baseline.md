# ADR-001: Static Astro landing-page baseline

Status: Accepted

## Context

The ecosystem selects Astro with React for landing pages, portfolios, and content sites. This repository begins as a landing-page starter. The requested baseline uses plain CSS, the ecosystem quality tooling, and a Cloudflare deployment guide.

## Decision

Use static Astro output, strict TypeScript, plain CSS, and one React pricing island hydrated when visible. Use native HTML for navigation and FAQ. Use npm with a committed lockfile and Node 24 LTS for development and CI.

Enforce formatting, lint, type checks, an 80% TypeScript/TSX line coverage gate, hook tests, build, and separate Chromium browser tests. Call the existing ecosystem frontend/PR-title workflows using a reviewed immutable commit.

Document Cloudflare Workers Static Assets integration with Terraform ownership. Deployment and SSR adapters are outside this baseline.

## Alternatives considered

- An Ant Design or Tailwind baseline adds a styling system beyond the selected CSS approach.
- An SSR Worker baseline introduces runtime rendering and deployment requirements unnecessary for this landing page.

## Consequences

The page is readable without JavaScript, and interactivity is confined to the pricing island. No application backend is required. Consumers replace fictional content, actual origin, and contact details before publishing.

Astro templates are verified by type checks and browser tests, while V8 coverage measures executable TypeScript/TSX. Real deployment behavior requires separate validation. New UI libraries, CMS, analytics, and observability remain future decisions.
