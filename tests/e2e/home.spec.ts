import { test, expect } from '@playwright/test';

test('homepage has Learn link', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: 'Learn' })).toBeVisible();
});
