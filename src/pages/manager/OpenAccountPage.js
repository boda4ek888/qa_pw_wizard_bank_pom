import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.customerDropdown = page.getByTestId('userSelect');
    this.currencyDropdown = page.getByTestId('currency');
    this.processButton = page.getByRole('button', { name: 'Process' });
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/openAccount',
    );
  }

  async selectCurrency(currency) {
    await this.currencyDropdown.selectOption(currency);
  }

  async clickProcessButton() {
    await this.processButton.click();
  }

  async assertValueInCurrencyDropdown(expectedValue) {
    await expect(this.currencyDropdown).toHaveValue(expectedValue);
  }

  async selectCustomer(firstName, lastName) {
    const fullName = `${firstName} ${lastName}`;
    await this.customerDropdown.selectOption({ label: fullName });
  }

  async reload() {
    await this.page.reload();
  }
}
