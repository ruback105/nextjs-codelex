import { test, expect } from "@playwright/test";

test("can successfully login given correct credentials", async ({ page }) => {
  const email = "test@email.com";
  const pw = "test123";

  await page.goto("http://localhost:3001/signin");

  const signInButton = page.getByText("Sign in");

  await expect(signInButton).toBeTruthy();

  const emailField = page.locator("input[type=email]");
  const passwordField = page.locator("input[type=password]");

  await emailField.fill(email);
  await passwordField.fill(pw);

  await signInButton.click();

  expect(page.getByText("Quiz Time")).toBeTruthy();
});
