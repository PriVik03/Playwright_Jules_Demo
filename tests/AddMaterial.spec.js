import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

test.beforeEach(async ({ page }) => {
  console.log(`Starting test: ${"Add Material test started"}`);
});

test.afterEach(async ({ page }) => {
  console.log(`Finished test: ${"Add Material test finished"}`);
});

test('test', async ({ page }) => {
  const email = process.env.email;
  const password = process.env.password;

  await page.goto('/');

  await page.locator('[data-test-id="input-email"]').getByRole('textbox').fill(email);
  await page.locator('[data-test-id="input-password"]').getByRole('textbox').fill(password);

  await page.locator('[data-test-id="signin"]').click();

  const page1Promise = page.waitForEvent('popup');
  await page.locator('a > .sc-gsnTZi > .MuiButtonBase-root').first().click();
  const page1 = await page1Promise;

  await page1.getByRole('button', { name: 'Add a material' }).click();

  const qualityButton = page1.locator('[data-test-id="OperationModal\\.quality"] button[name="Open"]');
  if (await qualityButton.isVisible() && await qualityButton.isEnabled()) {
    await qualityButton.click();
    await page1.locator('#mui-6885-option-0').getByText('1.02.00 - Good soft mixed.').click();
    await page1.locator('[data-test-id="OperationModal\\.qualityPdfDisplayName"]').getByText('- Good soft mixed').click();
  } else {
    console.log('Quality button is not clickable, skipping related actions.');
    await page1.close();
    return; // Exit the test
  }

  await page1.locator('[data-test-id="OperationModal\\.quantity"]').getByRole('spinbutton').fill('50');
  await page1.locator('[data-test-id="OperationModal\\.maxQuantityToLoad"]').getByRole('spinbutton').fill('50');
  await page1.locator('[data-test-id="OperationModal\\.averageQuantity"]').getByRole('spinbutton').fill('50');
  await page1.locator('[data-test-id="OperationModal\\.quantityToleranceRate"]').getByRole('spinbutton').fill('20');
  await page1.locator('[data-test-id="OperationModal\\.estimatedLogisticCost"]').getByRole('spinbutton').fill('5000');

  await page1.locator('[data-test-id="OperationModal\\.logisticMaterial"] input[name="Search"]').click();
  await page1.getByText('DEDICATED BUCKET').click();

  await page1.locator('[data-test-id="OperationModal\\.existingContainer"] input[name="Search"]').click();
  await page1.locator('[data-test-id="OperationModal\\.qualityDestinationCompany"] input[name="Search"]').click();
  await page1.getByText('Acier Turque').click();

  await page1.locator('.checkbox').first().click();
  await page1.getByRole('button', { name: 'Save' }).click();
  await page1.locator('div:nth-child(6) > .MuiButtonBase-root').click();
  await page1.getByRole('button', { name: 'Confirm' }).click();

  await page1.locator('[data-test-id="header-menu"]').getByText('Qa JULES').click();
  await page1.getByText('Log out').click();

  await page.goto('https://demo.haroldwaste.com/');
  await page1.goto('https://demo.haroldwaste.com/');
  await page.goto('https://demo.haroldwaste.com/');
  await page1.goto('https://demo.haroldwaste.com/authentication');
  await page.goto('https://demo.haroldwaste.com/authentication');
  await page1.goto('https://demo.haroldwaste.com/');
  await page.goto('https://demo.haroldwaste.com/authentication');
  await page1.goto('https://demo.haroldwaste.com/authentication');
  await page.goto('https://demo.haroldwaste.com/authentication');

  page.close();
});
