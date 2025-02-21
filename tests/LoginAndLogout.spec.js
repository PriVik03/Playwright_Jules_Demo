import { test, expect } from '@playwright/test';
//import dotenv from 'dotenv';

test.beforeEach(async ({ page }, testInfo) => {
  console.log(`Starting test: ${"Login And Logout test started"}`);
});

test.afterEach(async ({ page }, testInfo) => {
  console.log(`Finished test: ${"Login And Logout test finished"}`);
});

//require('dotenv').config();

const logindata= JSON.parse( JSON.stringify(require("../data/testdata.json")));
const validData = logindata.find((data) => data.email && data.password);
test('test', async ({ page }) => {
  //USING ENV FILE
  // const email = process.env.email;
  // const password = process.env.password;

  await page.goto('/');
  // await page.locator('[data-test-id="input-email"]').getByRole('textbox').fill(email);
  // await page.locator('[data-test-id="input-password"]').getByRole('textbox').fill(password);
  
  await page.locator('[data-test-id="input-email"]').getByRole('textbox').fill(validData.email);
  await page.locator('[data-test-id="input-password"]').getByRole('textbox').fill(validData.password);

  await page.locator('[data-test-id="signin"]').click();
  // Validate the outcome (i.e., successful login and landing on the dashboard)
  await expect(page.locator('[data-test-id="header-menu"]')).toBeVisible();

  await page.locator('[data-test-id="header-menu"]').getByText('QJ').click();
  await page.getByText('Log out').click();
  page.close();
});

