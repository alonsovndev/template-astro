# Development

Use Node 24 LTS and npm to match the project engine and CI. Install from `package-lock.json` with `npm ci`; do not use unsupported Node 23.

## Local workflow

```bash
npm ci
cp .env.example .env
npm run dev
```

Edit `src/config/site.ts` for branding, page copy, contact email, FAQ, and sample pricing. Edit `src/styles/global.css` for tokens and layout. Replace the artwork in `public/`; keep image dimensions and meaningful alternative text. The social preview uses `social-card.png` (1200 × 630); `social-card.svg` is the editable demo artwork. Update the corresponding asset paths and descriptions in site configuration.

Set `SITE_URL` in `.env` to your site's actual origin before building. It cannot include credentials, a path, query, or fragment. Shell environment values override `.env` values. Do not put secrets in content or any public configuration.

## Checks

```bash
make ci
npx playwright install chromium
npm run test:e2e
```

`make ci` runs format checking, lint, Astro checks, TypeScript checks for tool/browser-test configuration, Vitest coverage, hook regression tests, and static build. Browser tests build first and launch `astro preview` on port 4321; stop other processes using that port before running them.

Prettier formats `.astro` files through its Astro plugin. ESLint covers Astro templates, TypeScript, React hooks, and accessibility. `npm run format` and `npm run lint -- --fix` update files; their check counterparts do not.

## Git hooks

`npm ci` installs Husky locally. Pre-commit scans staged filenames and added lines for likely secrets, then runs lint-staged. Commit messages follow Conventional Commits. The secret scanner is a heuristic, not a guarantee; review staged changes yourself. Hooks are regression-tested in isolated temporary repositories.

Use a named feature/fix branch. Commit and push only when requested. Never bypass hooks or commit environment files. Reusable CI installs with `--ignore-scripts`, so CI runs explicit checks instead of configuring developer Git hooks.
