# template-astro

A static landing-page starter built with Astro, strict TypeScript, plain CSS, and a React pricing island. Forma is a fictional product: replace the demo content before publishing. The engineering ecosystem uses Astro for landing pages, portfolios, and content sites.

## Start

Requires Node 24 LTS and npm. Use `nvm use` when nvm is available; `.nvmrc` selects Node 24.

```bash
npm ci
cp .env.example .env
npm run dev
```

Open the URL printed by Astro. To customize the page, edit `src/config/site.ts`, then replace the local artwork and CSS tokens. Set `SITE_URL` to your actual HTTP(S) origin before building; `https://example.com` is a placeholder. No service credentials are needed.

## Commands

| Command            | Purpose                                                      |
| ------------------ | ------------------------------------------------------------ |
| `make install`     | Install locked dependencies with npm                         |
| `make dev`         | Astro development server                                     |
| `make ci`          | Formatting, lint, type checks, coverage, hooks, static build |
| `make test`        | Vitest with an 80% line coverage gate                        |
| `npm run test:e2e` | Build and test static output in Chromium                     |
| `npm run preview`  | Preview the existing production build                        |

Before the first browser test, run `npx playwright install chromium`. The CI caller installs Chromium through the reusable frontend workflow.

## Included

- Responsive homepage, native FAQ disclosure, working email links, and a static 404 page
- React pricing selector hydrated when visible, with readable monthly pricing without JavaScript
- Shared page metadata, canonical URL, sitemap, robots output, favicon, and social image
- Vitest/Testing Library, Playwright, Astro checks, ESLint, and Prettier
- Git hooks for staged secret checks, lint/format checks, and Conventional Commits
- GitHub Actions callers for pinned reusable frontend and PR-title workflows

## Documentation

See [architecture](docs/architecture.md), [development](docs/development.md), [testing](docs/testing.md), [deployment](docs/deployment.md), and the [baseline decision](docs/adr/adr-001-astro-landing-page-baseline.md).

## License

MIT. See [LICENSE](LICENSE).
