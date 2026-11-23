export class HomePage {
  constructor(page) {
    this.page = page;
    this.searchInput = page.locator('input.search-keyword');
    this.productCards = page.locator('div.products div.product');
    this.noResultsMessage = page.locator('div.no-results h2');
    this.cartIcon = page.locator('a.cart-icon');
    this.cartPreview = page.locator('div.cart-preview');
    this.cartItemCount = page.locator('div.cart-info tr:nth-child(1) strong');
    this.cartTotalPrice = page.locator('div.cart-info tr:nth-child(2) strong');
    this.proceedToCheckoutBtn = page.getByRole('button', { name: 'PROCEED TO CHECKOUT' });
    this.emptyCartMessage = page.locator('div.cart-preview div.empty-cart h2');
    this.topDealsLink = page.getByRole('link', { name: 'Top Deals' });
  }

  async goto() {
    await this.page.goto('./');
    await this.productCards.first().waitFor({ state: 'visible' });
  }

  async searchProduct(keyword) {
    await this.searchInput.fill(keyword);
  }

  async clearSearch() {
    await this.searchInput.fill('');
  }

  getProductCardByName(productName) {
    return this.productCards.filter({
      has: this.page.locator('h4.product-name', { hasText: productName }),
    });
  }

  async setProductQuantity(productName, targetQty) {
    const card = this.getProductCardByName(productName);
    const incrementBtn = card.locator('a.increment');
    const decrementBtn = card.locator('a.decrement');
    const qtyInput = card.locator('input.quantity');

    let currentQty = Number(await qtyInput.inputValue());
    while (currentQty < targetQty) {
      await incrementBtn.click();
      currentQty++;
    }
    while (currentQty > targetQty && currentQty > 1) {
      await decrementBtn.click();
      currentQty--;
    }
  }

  async addProductToCart(productName, quantity = 1) {
    if (quantity !== 1) {
      await this.setProductQuantity(productName, quantity);
    }
    const card = this.getProductCardByName(productName);
    await card.getByRole('button', { name: /ADD TO CART|✔ ADDED/ }).click();
  }

async openCartPreview() {
    const isAlreadyOpen = await this.cartPreview.evaluate((el) =>
      el.classList.contains('active')
    );

    if (!isAlreadyOpen) {
      await this.cartIcon.click();
      await this.cartPreview.locator('.active').or(this.proceedToCheckoutBtn).waitFor({ state: 'visible' });
    }
  }

  async removeItemFromCartPreview(productName) {
    const cartItem = this.page.locator('div.cart-preview li.cart-item').filter({
      hasText: productName,
    });
    await cartItem.locator('a.product-remove').click();
  }

async proceedToCheckout() {
    await this.openCartPreview();
    await this.proceedToCheckoutBtn.click();
  }
}