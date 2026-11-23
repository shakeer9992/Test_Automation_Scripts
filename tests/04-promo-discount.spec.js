import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage.js";
import { CartPage } from "../pages/CartPage.js";
import { TestData } from "../test-data/testData.js";

test.describe.serial("Module 4: Promo Code and Discount", () => {
  let homePage;
  let cartPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    cartPage = new CartPage(page);
    await homePage.goto();
    await homePage.addProductToCart("Almonds", 1);
    await homePage.addProductToCart("Pista", 1);
    await homePage.proceedToCheckout();
  });

  test("TC-M4-01 & 05: Valid promo applies 10% discount once even on repeated clicks", async ({
    page,
  }) => {
    await cartPage.applyPromoCode(TestData.promoCodes.valid);
    await expect(cartPage.promoInfo).toHaveText(TestData.messages.promoSuccess);
    await expect(cartPage.discountPercent).toHaveText("10%");
    await expect(cartPage.totalAmount).toHaveText("390");

    await cartPage.applyPromoBtn.click();
    await expect(cartPage.discountPercent).toHaveText("10%");
    await expect(cartPage.totalAfterDiscount).toHaveText("351");
  });

  test("TC-M4-02 & 03: Invalid and empty promo codes do not apply discount", async ({
    page,
  }) => {
    await cartPage.applyPromoCode(TestData.promoCodes.empty);
    await expect(cartPage.promoInfo).toHaveText(TestData.messages.promoEmpty);
    await expect(cartPage.totalAmount).toHaveText("390");
    await expect(cartPage.discountPercent).toHaveText("0%");
    await expect(cartPage.totalAfterDiscount).toHaveText("390");
    await page.waitForTimeout(5000);

    await cartPage.applyPromoCode(TestData.promoCodes.invalid);
    await page.waitForTimeout(5000);
    await expect(cartPage.promoInfo).toHaveText(TestData.messages.promoInvalid);
    await expect(cartPage.discountPercent).toHaveText("0%");
    await expect(cartPage.totalAfterDiscount).toHaveText("390");
  });
});
