import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({path:path.resolve(__dirname,'.','.env')});

test.beforeEach(async ({ page }) => {
  console.log(`Starting test: ${"Search feature test started"}`);
});

test.afterEach(async ({ page }) => {
  console.log(`Finished test: ${"Search feature test finished"}`);
});

require('dotenv').config();

test('test', async ({ page }) => {
  const email = process.env.email;
  const password = process.env.password;

  await page.goto('/');
  await page.locator('[data-test-id="input-email"]').getByRole('textbox').fill(email);
  await page.locator('[data-test-id="input-password"]').getByRole('textbox').fill(password);
  await page.locator('[data-test-id="signin"]').click();


  await page.getByRole('searchbox', { name: 'Search', exact: true }).click();
  await page.locator('#commandbar-search-tab-container').getByText('Navigation').click();
  await page.getByText('Go to the list of all open').click();
  await page.getByRole('searchbox', { name: 'Search by purchase ref or' }).click();
  await page.getByRole('searchbox', { name: 'Search by purchase ref or' }).fill('P2025-02-0-006-643');
  await page.getByRole('row', { name: 'Actions Purchase ref Status' }).getByRole('checkbox').check();
  await page.getByRole('row', { name: 'Actions Purchase ref Status' }).getByRole('checkbox').uncheck();
  await page.getByRole('searchbox', { name: 'Search by purchase ref or' }).fill('');

  await page.locator('[data-test-id="header-menu"]').getByText('QJ').click();
  await page.getByText('Log out').click();
  page.close();
});