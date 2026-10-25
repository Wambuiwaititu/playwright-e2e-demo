# Playwright E2E Demo

End-to-end tests in **Playwright + TypeScript** for the public practice store [saucedemo.com](https://www.saucedemo.com), written with the **page-object model** and run in **GitHub Actions**.

## Stack
Node 20, @playwright/test, TypeScript, GitHub Actions

## What is covered
- Login: valid user, locked-out user, empty username
- Cart: adding items updates the cart badge
- Checkout: full purchase with an order total check (items + tax = $43.18) and a required postal code check

## Design
- `pages/`: LoginPage, InventoryPage, CheckoutPage (locators + actions only)
- `tests/`: readable specs with assertions
- Locators use the site's `data-test` attributes (`testIdAttribute` in config)
- Traces and screenshots kept on failure; HTML report in `playwright-report/`

## Run it
```bash
npm install
npx playwright install chromium
npm test              # headless
npm run test:headed   # watch it run
npm run report        # open the HTML report
```

## Sample output
```
Running 5 tests using 4 workers
  ✓ [chromium] › tests/login.spec.ts › Login › standard user lands on Products
  ✓ [chromium] › tests/login.spec.ts › Login › locked out user sees an error
  ✓ [chromium] › tests/login.spec.ts › Login › empty username is rejected
  ✓ [chromium] › tests/checkout.spec.ts › add items, check total and complete order
  ✓ [chromium] › tests/checkout.spec.ts › checkout requires postal code
  5 passed (2.5s)
```
The credentials are the public demo accounts shown on saucedemo.com.
