import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage.js';
import { OffersPage } from '../pages/OffersPage.js';

test.describe.serial('Module 6: Offers and Product Sorting', () => {
  test('TC-M6-01 to 06: Navigate to Offers tab, search, and sort alphabetically & by price', async ({ page, context }) => {
    const homePage = new HomePage(page);
    await homePage.goto();

    const [offersTab] = await Promise.all([
      context.waitForEvent('page'),
      homePage.topDealsLink.click(),
    ]);
    await offersTab.waitForLoadState();

    const offersPage = new OffersPage(offersTab);
    await offersPage.pageSizeSelect.selectOption('20');

    await offersPage.vegNameHeader.click();
    const names = await offersPage.getColumnTexts(1);
    const sortedNames = [...names].sort((a, b) => a.localeCompare(b));
    expect(names).toEqual(sortedNames);

    await offersPage.priceHeader.click();
    const prices = (await offersPage.getColumnTexts(2)).map(Number);
    const sortedPrices = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sortedPrices);

    await offersPage.searchInput.fill('a');
    await offersPage.vegNameHeader.click();
    const filteredNames = await offersPage.getColumnTexts(1);
    expect(filteredNames.length).toBeGreaterThan(0);
    for (const name of filteredNames) {
      expect(name.toLowerCase()).toContain('a');
    }
  });
});