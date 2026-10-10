/// <reference types="vitest/config" />
import { getViteConfig } from "astro/config";

export default getViteConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "json"],
      include: ["src/**/*.{ts,tsx}"],
      // Test setup, declarations, and tests are not application behavior.
      exclude: ["src/test/**", "**/*.test.{ts,tsx}", "**/*.d.ts"],
      thresholds: { lines: 80 },
    },
  },
});
