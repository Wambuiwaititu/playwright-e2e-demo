import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.beforeEach(async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.login('standard_user', 'secret_sauce');
});

test('add items, check total and complete order', async ({ page }) => {
  const inventory = new InventoryPage(page);
  await inventory.addToCart('sauce-labs-backpack');      // $29.99
  await inventory.addToCart('sauce-labs-bike-light');    // $9.99
  await expect(inventory.cartBadge).toHaveText('2');

  await inventory.openCart();
  const checkout = new CheckoutPage(page);
  await checkout.start();
  await checkout.fillDetails('Test', 'User', '00100');
  // item total 39.98 + 8% tax 3.20 = 43.18
  await expect(checkout.total).toHaveText('Total: $43.18');
  await checkout.finish();
  await expect(checkout.complete).toHaveText('Thank you for your order!');
});

test('checkout requires postal code', async ({ page }) => {
  const inventory = new InventoryPage(page);
  await inventory.addToCart('sauce-labs-backpack');
  await inventory.openCart();
  const checkout = new CheckoutPage(page);
  await checkout.start();
  await checkout.fillDetails('Test', 'User', '');
  await expect(checkout.error).toContainText('Postal Code is required');
});
