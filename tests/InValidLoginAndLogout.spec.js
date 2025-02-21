import { test, expect } from '@playwright/test';
//import dotenv from 'dotenv';

test.beforeEach(async ({ page }) => {
  console.log(`Starting test: ${"Invalid Login And Logout test started"}`);
});

test.afterEach(async ({ page }, testInfo) => {
  console.log(`Finished test: ${"Invalid Login And Logout test finished"}`);
});


//require('dotenv').config();
const logindata= JSON.parse( JSON.stringify(require("../data/testdata.json")));
const inValidData = logindata.find((data) => data.invalidEmail && data.invalidPassword);

test('test', async ({ page }) => {  
  // const email = process.env.invalidemail;
  // const password = process.env.invalidpassword;

  await page.goto('/');
  await page.locator('[data-test-id="input-email"]').getByRole('textbox').fill(inValidData.invalidEmail);
  await page.locator('[data-test-id="input-password"]').getByRole('textbox').fill(inValidData.invalidPassword);
 
  await page.locator('[data-test-id="signin"]').click();
  await page.locator('div').filter({ hasText: 'Log inOptimize and control' }).nth(1).click();
  await expect(page.locator('#root')).toContainText('Log inOptimize and control your sourcing of recycled materials conveniently.EmailPasswordLog inLogin with MicrosoftLogin with Google');
  page.close();
});