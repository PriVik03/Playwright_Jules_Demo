import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({path:path.resolve(__dirname,'.','.env')});

test.beforeEach(async ({ page }, testInfo) => {
  console.log(`Starting test: ${"Login And Logout test started"}`);
});

test.afterEach(async ({ page }, testInfo) => {
  console.log(`Finished test: ${"Login And Logout test finished"}`);
});

require('dotenv').config();

test('test', async ({ page }) => {
  const email = process.env.email;
  const password = process.env.password;

  await page.goto('/');
  await page.locator('[data-test-id="input-email"]').getByRole('textbox').fill(email);
  await page.locator('[data-test-id="input-password"]').getByRole('textbox').fill(password);

  await page.locator('[data-test-id="signin"]').click();
  await page.locator('[data-test-id="header-menu"]').getByText('QJ').click();
  await page.getByText('Log out').click();
  page.close();
});