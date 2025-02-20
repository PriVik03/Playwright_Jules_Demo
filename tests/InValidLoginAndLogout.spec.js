import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({path:path.resolve(__dirname,'.','.env')});

test.beforeEach(async ({ page }) => {
  console.log(`Starting test: ${"Invalid Login And Logout test started"}`);
});

test.afterEach(async ({ page }, testInfo) => {
  console.log(`Finished test: ${"Invalid Login And Logout test finished"}`);
});


require('dotenv').config();

test('test', async ({ page }) => {  
  const email = process.env.invalidemail;
  const password = process.env.invalidpassword;

  await page.goto('/');
  await page.locator('[data-test-id="input-email"]').getByRole('textbox').fill(email);
  await page.locator('[data-test-id="input-password"]').getByRole('textbox').fill(password);
 
  await page.locator('[data-test-id="signin"]').click();

  //await page.locator('div').filter({ hasText: 'Log inOptimize and control' }).nth(1).click();
 // await page.locator('div').filter({ hasText: 'Log inOptimize and control' }).nth(1).click();
  // await page.locator('[data-test-id="signin"]').click();
  // await expect(page.locator('[data-test-id="signin"]')).toBeVisible();
 // await page.locator('[data-test-id="signin"]').click();
  await page.locator('div').filter({ hasText: 'Log inOptimize and control' }).nth(1).click();
//   await expect(page.locator('[data-test-id="signin"]')).toContainText('Log in');
//   await expect(page.locator('form')).toContainText('EmailPasswordLog in');
//  // await expect(page.locator('[data-test-id="signin"]')).toContainText('Log in');
//   await page.locator('[data-test-id="signin"]').click();
   await expect(page.locator('#root')).toContainText('Log inOptimize and control your sourcing of recycled materials conveniently.EmailPasswordLog inLogin with MicrosoftLogin with Google');
//   await page.locator('[data-test-id="signin"]').click();
 // await page.locator('[data-test-id="signin"]').click();
 page.close();
});