import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import {AddCustomerPage} from "../../../src/pages/manager/AddCustomerPage";
import {OpenAccountPage} from "../../../src/pages/manager/OpenAccountPage";
import {CustomersListPage} from "../../../src/pages/manager/CustomersListPage";

let addCustomerPage;
let openAccountPage;
let customerListPage;
const firstName = faker.person.firstName();
const lastName = faker.person.lastName();
const postCode = faker.location.zipCode();

test.beforeEach(async ({ page }) => {
    addCustomerPage = new AddCustomerPage(page);
    openAccountPage = new OpenAccountPage(page);
    customerListPage = new CustomersListPage(page);

    await addCustomerPage.open();
    await addCustomerPage.fillFirstName(firstName);
    await addCustomerPage.fillLastName(lastName);
    await addCustomerPage.fillPostCode(postCode);
    await addCustomerPage.clickAddCustomerButton();
    await page.reload();
});


test('Assert manager can add new customer', async ({ page }) => {
    await openAccountPage.open();
    await openAccountPage.selectCustomer(firstName, lastName);
    await openAccountPage.selectCurrency('Dollar');
    await openAccountPage.clickProcessButton();
    await page.reload();
    await customerListPage.clickCustomersButton();
    await customerListPage.assertAccountNumberNotEmpty();
});
