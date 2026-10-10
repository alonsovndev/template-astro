# AGENTS.md

## Project

Static Astro landing-page template. Astro renders pages; React hydrates the pricing island. Use plain CSS and strict TypeScript. Keep content in `src/config/site.ts`, feature behavior in its feature folder, and shared page framing in layouts/components.

## Commands

Use Node 24 LTS and npm. `make install`, `make dev`, `make ci`, and `npm run test:e2e` are the supported commands. `make ci` checks formatting, lint, Astro/TypeScript, Vitest with 80% line coverage, hooks, and static build. Browser tests exercise built output.

## Rules

- Read affected files and tests before editing. Keep changes focused.
- Use native HTML for static behavior; add React only for interactive islands.
- Keep keyboard access, visible focus, responsive layout, and reduced motion.
- Avoid untrusted HTML injection and committed secrets. `.env.example` contains placeholders only.
- Approve new dependencies explicitly; do not weaken checks or bypass hooks.
- Update relevant documentation and add an ADR for architecture decisions.
- Run checks and local code review before claiming completion; report gaps.
- Do not commit or push unless asked. Never stage/commit/push on `main`, `master`, or `dev`.
- Terraform owns deployment resources. This template builds assets and does not deploy them.
