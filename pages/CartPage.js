export class CartPage {
  constructor(page) {
    this.page = page;
    this.tableRows = page.locator('table#productCartTables tbody tr');
    this.promoInput = page.locator('input.promoCode');
    this.applyPromoBtn = page.locator('button.promoBtn');
    this.promoInfo = page.locator('span.promoInfo');
    this.totalAmount = page.locator('span.totAmt');
    this.discountPercent = page.locator('span.discountPerc');
    this.totalAfterDiscount = page.locator('span.discountAmt');
    this.placeOrderBtn = page.getByRole('button', { name: 'Place Order' });
  }

  async applyPromoCode(code) {
    await this.promoInput.fill(code);
    await this.applyPromoBtn.click();
    await this.promoInfo.waitFor({ state: 'visible', timeout: 10000 });
  }

async getRowTotals() {
    const totalCells = this.tableRows.locator('td:nth-child(5) p.amount');
    await totalCells.first().waitFor({ state: 'visible', timeout: 5000 });

    const texts = await totalCells.allInnerTexts();
    return texts.map((text) => Number(text.trim()));
  }
}