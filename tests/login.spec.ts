import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

// secret_sauce is the public demo password published on saucedemo.com
const PASSWORD = 'secret_sauce';

test.describe('Login', () => {
  test('standard user lands on Products', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('standard_user', PASSWORD);
    await expect(new InventoryPage(page).title).toHaveText('Products');
  });

  test('locked out user sees an error', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('locked_out_user', PASSWORD);
    await expect(login.error).toContainText('locked out');
  });

  test('empty username is rejected', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('', PASSWORD);
    await expect(login.error).toContainText('Username is required');
  });
});
