import { expect, test } from "@playwright/test";

test("renders metadata and usable navigation", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page).toHaveTitle("Forma — Room for your next idea");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Give your next idea room to grow."
  );
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    /A clear place/
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://example.com/"
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    "https://example.com/social-card.png"
  );
  await page.getByRole("navigation").getByRole("link", { name: "Features", exact: true }).click();
  await expect(page).toHaveURL(/#features$/);
  await page.getByRole("navigation").getByRole("link", { name: "Pricing", exact: true }).click();
  await expect(page.getByRole("radio", { name: "Annual" })).toBeEnabled();
  await page.getByRole("radio", { name: "Annual" }).check();
  await expect(page.getByRole("article", { name: "Essential plan" })).toContainText("$10");
  await expect(page.getByRole("article", { name: "Together plan" })).toContainText(
    "Billed annually"
  );
  await page.getByRole("radio", { name: "Monthly" }).check();
  await expect(page.getByRole("article", { name: "Together plan" })).toContainText("$24");
  await expect(page.getByRole("link", { name: "Say hello", exact: true }).last()).toHaveAttribute(
    "href",
    "mailto:hello@example.com"
  );
  expect(errors).toEqual([]);
});

test("supports keyboard navigation and FAQ disclosure", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main$/);
  await expect(page.getByRole("main")).toBeFocused();
  const question = page
    .locator("summary")
    .filter({ hasText: "Are these real products and prices?" });
  await question.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByText("No. Forma is a fictional product.", { exact: false })).toBeVisible();
});

test("keeps navigation and content usable on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true
  );
  await page.getByRole("navigation").getByRole("link", { name: "Questions" }).click();
  await page.locator("summary").filter({ hasText: "Can I make this page my own?" }).click();
  await expect(
    page.getByText(
      "Yes. Replace the name, copy, colors, illustrations, and contact details with your own."
    )
  ).toBeVisible();
});

test("renders useful content without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByRole("article", { name: "Essential plan" })).toContainText("$12");
  await expect(page.getByRole("radio", { name: "Annual" })).toBeDisabled();
  await page.locator("summary").filter({ hasText: "Are these real products and prices?" }).click();
  await expect(page.getByText("No. Forma is a fictional product.", { exact: false })).toBeVisible();
  await context.close();
});

test("serves static discovery assets and a recoverable 404 page", async ({ page, request }) => {
  const robots = await request.get("/robots.txt");
  expect(robots.ok()).toBe(true);
  expect(await robots.text()).toContain("Sitemap: https://example.com/sitemap-index.xml");
  const sitemap = await request.get("/sitemap-0.xml");
  expect(sitemap.ok()).toBe(true);
  expect(await sitemap.text()).toContain("<loc>https://example.com/</loc>");
  expect(await sitemap.text()).not.toContain("/404/");
  await page.goto("/404.html");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("This page wandered off.");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex");
  await page.getByRole("link", { name: "Back to home" }).click();
  await expect(page).toHaveURL("/");
});
