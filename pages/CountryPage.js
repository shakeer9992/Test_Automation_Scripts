export class CountryPage {
  constructor(page) {
    this.page = page;
    this.countrySelect = page.locator('select');
    this.agreeCheckbox = page.locator('input.chkAgree');
    this.proceedBtn = page.getByRole('button', { name: 'Proceed' });
    this.errorAlert = page.locator('span.errorAlert');
    this.confirmationContainer = page.locator('div.wrapperTwo');
  }

  async completeOrder(country, acceptTerms = true) {
    if (country) {
      await this.countrySelect.selectOption(country);
    }
    if (acceptTerms) {
      await this.agreeCheckbox.check();
    }
    await this.proceedBtn.click();
  }
}