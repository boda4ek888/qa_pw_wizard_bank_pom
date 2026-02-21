import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import {AddCustomerPage} from "../../../src/pages/manager/AddCustomerPage";
import {CustomersListPage} from "../../../src/pages/manager/CustomersListPage";

let addCustomerPage;
let customersListPage;
const firstName = faker.person.firstName();
const lastName = faker.person.lastName();
const postCode = faker.location.zipCode();

test.beforeEach(async ({ page }) => {
    addCustomerPage = new AddCustomerPage(page);
    customersListPage = new CustomersListPage(page);

    await addCustomerPage.open();
    await addCustomerPage.fillFirstName(firstName);
    await addCustomerPage.fillLastName(lastName);
    await addCustomerPage.fillPostCode(postCode);
    await addCustomerPage.clickAddCustomerButton();
});

test('Assert manager can delete customer', async ({ page }) => {
    await customersListPage.open();
    await customersListPage.clickDeleteButton(firstName, lastName);
    await page.reload();
    await customersListPage.assertFirstNameRemoved(firstName);
    await customersListPage.assertLastNameRemoved(lastName);
});
