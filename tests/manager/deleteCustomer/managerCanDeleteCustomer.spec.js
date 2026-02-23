import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import {AddCustomerPage} from "../../../src/pages/manager/AddCustomerPage";
import {CustomersListPage} from "../../../src/pages/manager/CustomersListPage";

let addCustomerPage;
let customersListPage;
let firstName;
let lastName;
let postCode;

test.beforeEach(async ({ page }) => {
    firstName = faker.person.firstName();
    lastName = faker.person.lastName();
    postCode = faker.location.zipCode();

    addCustomerPage = new AddCustomerPage(page);
    customersListPage = new CustomersListPage(page);

    await addCustomerPage.open();
    await addCustomerPage.fillFirstName(firstName);
    await addCustomerPage.fillLastName(lastName);
    await addCustomerPage.fillPostCode(postCode);
    await addCustomerPage.clickAddCustomerButton();
});

test('Assert manager can delete customer', async () => {
    await customersListPage.open();
    await customersListPage.clickDeleteUserButton(firstName, lastName);
    await customersListPage.assertFirstNameRemoved(firstName);
    await customersListPage.assertLastNameRemoved(lastName);
});
