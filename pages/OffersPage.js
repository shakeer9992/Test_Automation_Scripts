export class OffersPage {
  constructor(page) {
    this.page = page;
    this.searchInput = page.locator('#search-field');
    this.pageSizeSelect = page.locator('#page-menu');
    this.tableRows = page.locator('table.table-bordered tbody tr');
    this.vegNameHeader = page.locator('th[aria-label*="Veg/fruit name"]');
    this.priceHeader = page.locator('th[aria-label*="Price"]');
  }

  async getColumnTexts(colIndex) {
    const count = await this.tableRows.count();
    const values = [];
    for (let i = 0; i < count; i++) {
      const cellText = await this.tableRows.nth(i).locator(`td:nth-child(${colIndex})`).innerText();
      values.push(cellText.trim());
    }
    return values;
  }
}