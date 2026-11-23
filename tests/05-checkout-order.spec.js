import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage.js';
import { CartPage } from '../pages/CartPage.js';
import { CountryPage } from '../pages/CountryPage.js';
import { TestData } from '../test-data/testData.js';

test.describe.serial('Module 5: Checkout and Order Placement', () => {
  test('TC-M5-01, 02 & 03: End-to-end checkout, terms validation, and confirmation', async ({ page }) => {
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);
    const countryPage = new CountryPage(page);

    await homePage.goto();
    await homePage.addProductToCart('Brocolli', 2);
    await homePage.addProductToCart('Tomato', 3);
    await homePage.proceedToCheckout();
    const rowTotals = await cartPage.getRowTotals();
    const sum = rowTotals.reduce((acc, val) => acc + val, 0);
    await expect(cartPage.totalAmount).toHaveText(String(sum));
    

    await cartPage.placeOrderBtn.click();

    await countryPage.completeOrder(TestData.country, false);
    await expect(countryPage.errorAlert).toHaveText(TestData.messages.termsRequired);

    await countryPage.completeOrder(TestData.country, true);
    await expect(countryPage.confirmationContainer).toContainText(TestData.messages.orderSuccess);
  });
});