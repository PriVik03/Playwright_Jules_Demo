import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  console.log(`Starting test: ${"Error validation test started"}`);
});

test.afterEach(async ({ page }) => {
  console.log(`Finished test: ${"Error validation test finished"}`);
});

test('test', async ({ page }) => {
  // const email = process.env.email;
  // const password = process.env.password;
  await page.goto('/');
  await page.locator('[data-test-id="signin"]').click();
  await page.getByText('Required').first().click();
  await expect(page.locator('form')).toContainText('Required');
  await page.getByText('Required').nth(1).click();
  await expect(page.locator('form')).toContainText('Required');
 page.close();
  // await page.getByText('Required').first().click({
  //   button: 'right'
  // }); 
  
});