import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.tableBody = page.getByRole('table').getByRole('rowgroup').last();
    this.tableRows = this.tableBody.getByRole('row');
    this.lastTableRow = this.tableBody.getByRole('row').last();
    this.firstNameCell = this.lastTableRow.getByRole('cell').nth(0);
    this.lastNameCell = this.lastTableRow.getByRole('cell').nth(1);
    this.postCodeCell = this.lastTableRow.getByRole('cell').nth(2);
    this.accountNumberCell = this.lastTableRow.getByRole('cell').nth(3);
    this.deleteButtonCell = page.getByRole('button', {name: 'Delete'});
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
    await row.locator(this.deleteButtonCell).click();
  }

  async assertFirstName(expectedFirstName) {
    await expect(this.firstNameCell).toContainText(expectedFirstName);
  }
  async assertFirstNameRemoved(expectedFirstName) {
    const rowWithFirstName = this.tableRows.filter({
      hasText: expectedFirstName
    });
    await expect(rowWithFirstName).toBeHidden();
  }

  async assertLastName(expectedLastName) {
    await expect(this.lastNameCell).toContainText(expectedLastName);
  }
  async assertLastNameRemoved(expectedLastName) {
    const rowWithLastName = this.tableRows.filter({
      hasText: expectedLastName
    });
    await expect(rowWithLastName).toBeHidden();
  }

  async assertPostCode(expectedPostCode) {
    await expect(this.postCodeCell).toContainText(expectedPostCode);
  }

  async assertAccountNumberIsEmpty() {
    await expect(this.accountNumberCell).toBeEmpty();
  }

  async assertAccountNumberNotEmpty() {
    await expect(this.accountNumberCell).not.toBeEmpty();
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

  async reload() {
    await this.page.reload();
  }

  async assertTableIsVisible() {
    await expect(this.tableBody).toBeVisible();
  }
}
