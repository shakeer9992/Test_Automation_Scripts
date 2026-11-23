import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage.js';
import { TestData } from '../test-data/testData.js';

test.describe.serial('Module 3: Shopping Cart', () => {
  let homePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test('TC-M3-01: Empty cart blocks checkout', async ({page}) => {
    await homePage.openCartPreview();
    await expect(homePage.emptyCartMessage).toHaveText(TestData.messages.emptyCart);
    await expect(homePage.proceedToCheckoutBtn).toHaveClass(/disabled/);
  });

  test('TC-M3-02, 03 & 04: View items, remove item, and verify recalculation', async ({page}) => {
    await homePage.addProductToCart('Carrot', 2);
    await homePage.addProductToCart('Beans', 2);

    await homePage.openCartPreview();
    await expect(homePage.page.locator('div.cart-preview li.cart-item')).toHaveCount(2);

    await homePage.removeItemFromCartPreview('Carrot');
    await expect(homePage.cartItemCount).toHaveText('1');
   await expect(homePage.cartTotalPrice).toHaveText('164');
   await homePage.proceedToCheckout();
  });
});