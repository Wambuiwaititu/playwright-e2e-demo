import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly title: Locator;
  readonly cartBadge: Locator;

  constructor(private readonly page: Page) {
    this.title = page.getByTestId('title');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
  }

  async addToCart(slug: string) {
    await this.page.getByTestId(`add-to-cart-${slug}`).click();
  }

  async openCart() {
    await this.page.getByTestId('shopping-cart-link').click();
  }
}
