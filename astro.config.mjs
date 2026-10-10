import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { loadEnv } from "vite";

const environment = loadEnv(process.env.NODE_ENV ?? "development", process.cwd(), "");
const site = process.env.SITE_URL ?? environment.SITE_URL ?? "https://example.com";
const siteUrl = new URL(site);
if (
  !["https:", "http:"].includes(siteUrl.protocol) ||
  siteUrl.pathname !== "/" ||
  siteUrl.search ||
  siteUrl.hash ||
  siteUrl.username ||
  siteUrl.password
) {
  throw new Error(
    "SITE_URL must be an HTTP(S) origin without a path, credentials, query, or fragment."
  );
}

export default defineConfig({
  site: siteUrl.origin,
  output: "static",
  trailingSlash: "always",
  vite: { preview: { strictPort: true } },
  integrations: [react(), sitemap({ filter: (page) => !page.endsWith("/404/") })],
});
