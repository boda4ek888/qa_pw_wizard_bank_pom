import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.tableBody = page.getByRole('table').getByRole('rowgroup').last();
    this.tableRows = this.tableBody.getByRole('row');
    this.customersButton = page.getByRole('button', {
      name: 'Customers',
    });
    this.searchField = page.getByPlaceholder('Search Customer');
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async clickDeleteUserButton(firstName, lastName) {
    const row = this.tableRows.filter({
      hasText: `${firstName} ${lastName}`
    });
    await row.getByRole('button', { name: 'Delete' }).click()
  }

  async assertCustomerIsPresent(firstName, lastName, postCode) {
    const row = this.tableRows.filter({
      hasText: `${firstName} ${lastName} ${postCode}`
    });
    await expect(row).toBeVisible();
  }

  async assertCustomerIsRemoved(firstName, lastName) {
    const row = this.tableRows.filter({
      hasText: `${firstName} ${lastName}`
    });
    await expect(row).toBeHidden();
  }

  async assertAccountNumberIsEmpty(firstName, lastName) {
    const row = this.tableRows.filter({
      hasText: `${firstName} ${lastName}`
    });
    await expect(row.getByRole('cell').nth(3)).toBeEmpty();
  }

  async assertAccountNumberNotEmpty(firstName, lastName) {
    const row = this.tableRows.filter({
      hasText: `${firstName} ${lastName}`
    });
    await expect(row.getByRole('cell').nth(3)).not.toBeEmpty();
  }

  async clickCustomersButton() {
    await this.customersButton.click();
  }

  async fillSearchField(searchTerm) {
    await this.searchField.fill(searchTerm);
  }

  async assertOneSearchResultReturned() {
    await expect(this.tableRows).toHaveCount(1)
  }

  async assertTableIsVisible() {
    await expect(this.tableBody).toBeVisible();
  }
}
