import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import {AddCustomerPage} from "../../../src/pages/manager/AddCustomerPage";
import {CustomersListPage} from "../../../src/pages/manager/CustomersListPage";

let firstName;
let lastName;
let postalCode;
let addCustomerPage;
let customersListPage;

test.beforeEach(async ({ page }) => {
  addCustomerPage = new AddCustomerPage(page);
  customersListPage = new CustomersListPage(page);

  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  postalCode = faker.location.zipCode();

  await addCustomerPage.open();
  await addCustomerPage.fillFirstName(firstName);
  await addCustomerPage.fillLastName(lastName);
  await addCustomerPage.fillPostCode(postalCode);
  await addCustomerPage.clickAddCustomerButton();
});

test('Assert manager can search customer by Postal Code',  async () => {
  await customersListPage.open();
  await customersListPage.assertTableIsVisible();
  await customersListPage.fillSearchField(postalCode);
  await customersListPage.assertFirstName(firstName);
  await customersListPage.assertLastName(lastName);
  await customersListPage.assertPostCode(postalCode);
  await customersListPage.assertOneSearchResultReturned();
});
