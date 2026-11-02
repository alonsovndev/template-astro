# Testing

Tests exercise the pricing interaction and the built static site without calling external services.

## Fast tests

```bash
npm run test
npm run test:hooks
```

Vitest and React Testing Library verify default monthly pricing, disabled pre-hydration controls, annual pricing, keyboard switching, and contact links. The 80% line threshold covers executable application TypeScript/TSX. Only test files, setup, and declarations are excluded. Astro templates are checked by Astro and browser tests rather than included in V8 line coverage.

Hook tests run in temporary Git repositories. They verify valid/invalid commit subjects, allowed placeholders, blocked environment files, added credential patterns, renames to blocked destinations, and staged additions whose working copies were removed.

## Browser tests

```bash
npx playwright install chromium
npm run test:e2e
```

Playwright rebuilds the site and starts a fresh production preview server. Chromium tests cover metadata, navigation, pricing hydration, keyboard access, FAQ disclosure, mobile overflow, content without JavaScript, sitemap/robots, and static 404 recovery. Browser tests do not measure Astro template line coverage.

The demo tests use the template's default content and placeholder origin; update their assertions when customizing either. Cloudflare headers and real unknown-route status handling are deployment behavior; preview checks the generated `404.html` directly.

## CI

`make ci` is the quality contract used by the reusable frontend workflow. Browser tests run in its separate job. The caller also checks PR titles and grants only read access to repository contents. Workflow execution on GitHub requires a separate push/request; creating the YAML does not prove a remote run passed.

See [verification](verification.md) for the recorded local results.
