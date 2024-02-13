import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle("ServiYA");
});


test.describe('register', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/register')
  })

  test('if send everything empty, should show all errors messages', async ({ page }) => {

    await page.click('button[type="submit"]');

    const errorMessages = await page.$$('.error')
    expect(errorMessages.length).toBe(4)
  })

  test('if only completes the email, should show the rest of errors messages', async ({ page }) => {

    await page.fill('input[name="email"]', 'jhon@valid.com');
    await page.click('button[type="submit"]');

    const errorMessages = await page.$$('.error')
    expect(errorMessages.length).toBe(3)
  })

})
