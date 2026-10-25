import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
  readonly error: Locator;
  readonly total: Locator;
  readonly complete: Locator;

  constructor(private readonly page: Page) {
    this.error = page.getByTestId('error');
    this.total = page.getByTestId('total-label');
    this.complete = page.getByTestId('complete-header');
  }

  async start() {
    await this.page.getByTestId('checkout').click();
  }

  async fillDetails(first: string, last: string, postcode: string) {
    await this.page.getByTestId('firstName').fill(first);
    await this.page.getByTestId('lastName').fill(last);
    await this.page.getByTestId('postalCode').fill(postcode);
    await this.page.getByTestId('continue').click();
  }

  async finish() {
    await this.page.getByTestId('finish').click();
  }
}
