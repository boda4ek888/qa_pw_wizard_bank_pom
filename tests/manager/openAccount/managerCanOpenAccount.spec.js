import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import {AddCustomerPage} from "../../../src/pages/manager/AddCustomerPage";
import {OpenAccountPage} from "../../../src/pages/manager/OpenAccountPage";
import {CustomersListPage} from "../../../src/pages/manager/CustomersListPage";

let addCustomerPage;
let openAccountPage;
let customerListPage;
let firstName;
let lastName;
let postCode;

test.beforeEach(async ({ page }) => {
    firstName = faker.person.firstName();
    lastName = faker.person.lastName();
    postCode = faker.location.zipCode();

    addCustomerPage = new AddCustomerPage(page);
    openAccountPage = new OpenAccountPage(page);
    customerListPage = new CustomersListPage(page);

    await addCustomerPage.open();
    await addCustomerPage.fillFirstName(firstName);
    await addCustomerPage.fillLastName(lastName);
    await addCustomerPage.fillPostCode(postCode);
    await addCustomerPage.clickAddCustomerButton();
});


test('Assert manager can open account for a customer', async () => {
    await openAccountPage.open();
    await openAccountPage.selectCustomer(firstName, lastName);
    await openAccountPage.selectCurrency('Dollar');
    await openAccountPage.clickProcessButton();
    await customerListPage.open();
    await customerListPage.assertAccountNumberNotEmpty(firstName, lastName);
});
