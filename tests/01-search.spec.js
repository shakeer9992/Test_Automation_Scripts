import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage.js';
import { TestData } from '../test-data/testData.js';

test.describe.serial('Module 1: Product Search', () => {
  let homePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test('TC-M1-01 & 02: Search by exact and partial keyword', async () => {
    await homePage.searchProduct('flower');
    await expect(homePage.productCards).toHaveCount(1);

    await homePage.searchProduct('Brocolli');
    await expect(homePage.productCards).toHaveCount(1);
    await expect(homePage.productCards.first()).toContainText('Brocolli');
  });

  test('TC-M1-03: Case-insensitive search', async () => {
    await homePage.searchProduct('MANGO');
    await expect(homePage.productCards).toHaveCount(1);
    await expect(homePage.productCards.first()).toContainText('Mango');
  });

  test('TC-M1-04: Empty state on unmatched product search', async ({page}) => {
    await homePage.searchProduct('DragonfruitXYZ');
    await expect(homePage.productCards).toHaveCount(0);
    await expect(homePage.noResultsMessage).toHaveText(TestData.messages.noSearchResults);
  });

  test('TC-M1-05: Clear search and search again', async ({page}) => {
    await homePage.searchProduct('Carrot');
    await expect(homePage.productCards).toHaveCount(1);

    await homePage.clearSearch();
    expect(await homePage.productCards.count()).toBeGreaterThan(20);

    await homePage.searchProduct('Tomato');
    await expect(homePage.productCards).toHaveCount(1);
  });
});