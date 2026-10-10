# Deployment

This template produces static files in `dist/`. Deployment targets Cloudflare Workers Static Assets managed by the ecosystem Terraform modules. No Cloudflare adapter is needed for static output.

## Build

Set `SITE_URL` to the actual production HTTP(S) origin, replace demo branding/contact details, and run the checks before building.

```bash
npm ci
make ci
npm run test:e2e
npm run build
```

The build must include `index.html`, `404.html`, `_headers`, robots/sitemap files, and the referenced assets. Preview with `npm run preview`.

## Terraform integration

A consuming infrastructure root owns provider credentials, backend, account ID, and domain inputs. Pin the `terraform-modules` repository to a reviewed commit or release and compose its `cloudflare/static-site` module. Pass the built `dist` directory as `assets_directory`, and use `spa_mode = false`.

Build assets before Terraform planning. The directory must exist and contain `index.html`. Supply custom domains as hostname-to-zone-ID mappings for zones you already own. Keep custom-domain DNS ownership in the static-site module; do not create a duplicate DNS record for that hostname.

Terraform owns the Worker, asset upload, and custom domains. Do not use Wrangler to deploy the same Worker independently. The module handles ordinary static HTML redirects and unknown routes through `404.html`. `_headers` configures basic response headers for static assets; local Astro preview does not enforce Cloudflare headers.

## Validation still required

The account, domain, backend, and release workflow are consumer configuration, currently TBD. Real asset upload/redeployment, DNS/TLS activation, 404 HTTP status, response headers, and rendered pages must be verified in an approved deployment. Check the production canonical URL, sitemap, email links, and mobile/keyboard interaction afterward.

This template includes build/test CI only. It does not provision infrastructure or trigger a deployment.
