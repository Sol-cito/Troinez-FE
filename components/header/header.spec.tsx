import { test, expect } from "@playwright/test";

test("should navigate to the header", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await expect(page.locator("nav")).toContainText("IN GOLD WE TRUST PARIS");
});
