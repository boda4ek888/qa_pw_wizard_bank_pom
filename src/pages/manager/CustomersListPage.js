import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.tableBody = page.getByRole('table').getByRole('rowgroup').last();
    this.tableRows = this.tableBody.getByRole('row');
    this.lastTableRow = page.getByRole('row').last();
    this.firstNameCell = this.lastTableRow.getByRole('cell').nth(0);
    this.lastNameCell = this.lastTableRow.getByRole('cell').nth(1);
    this.postCodeCell = this.lastTableRow.getByRole('cell').nth(2);
    this.accountNumberCell = this.lastTableRow.getByRole('cell').nth(3);
    this.deleteButtonCell = this.lastTableRow.getByRole('button', {name: 'Delete'});
    this.customersButton = page.getByRole('button', {
      name: 'Customers',
    });
    this.searchField = page.getByPlaceholder('Search Customer');
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async clickDeleteButton() {
    await this.deleteButtonCell.click();
  }

  async assertFirstName(expectedFirstName) {
    await expect(this.firstNameCell).toContainText(expectedFirstName);
  }
  async assertFirstNameRemoved(expectedFirstName) {
    await expect(this.firstNameCell).not.toContainText(expectedFirstName);
  }

  async assertLastName(expectedLastName) {
    await expect(this.lastNameCell).toContainText(expectedLastName);
  }
  async assertLastNameRemoved(expectedLastName) {
    await expect(this.lastNameCell).not.toContainText(expectedLastName);
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
}
