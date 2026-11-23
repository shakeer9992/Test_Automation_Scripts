import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage.js';

test.describe.serial('Module 2: Product Listing and Quantity Management', () => {
  let homePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test('TC-M2-01 & 02: Products display name, price, and default quantity 1', async () => {
    const firstCard = homePage.productCards.first();
    await expect(firstCard.locator('h4.product-name')).not.toBeEmpty();
    await expect(firstCard.locator('p.product-price')).not.toBeEmpty();
    await expect(firstCard.locator('input.quantity')).toHaveValue('1');
  });

  test('TC-M2-03 & 04: Increment and decrement quantity with lower boundary at 1', async ({page}) => {
    const card = homePage.getProductCardByName('Cucumber');
    const qtyInput = card.locator('input.quantity');

    await card.locator('a.decrement').click();
    await expect(qtyInput).toHaveValue('1');

    await homePage.setProductQuantity('Cucumber', 4);
    await expect(qtyInput).toHaveValue('4');

    await card.locator('a.decrement').click();
    await expect(qtyInput).toHaveValue('3');
  });

  test('TC-M2-05 & 06: Add multiple products with custom quantities to cart', async ({page}) => {
    await homePage.addProductToCart('Brocolli', 2);
    await homePage.addProductToCart('Cauliflower', 3);

    await expect(homePage.cartItemCount).toHaveText('2');
    await expect(homePage.cartTotalPrice).toHaveText('420');
  });
});