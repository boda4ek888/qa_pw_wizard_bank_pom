import {test} from '@playwright/test';
import { faker } from '@faker-js/faker';
import {AddCustomerPage} from "../../../src/pages/manager/AddCustomerPage";
import {CustomersListPage} from "../../../src/pages/manager/CustomersListPage";

test('Assert manager can add new customer', async ({ page }) => {
    const addCustomerPage = new AddCustomerPage(page);
    const customersListPage = new CustomersListPage(page);
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const postCode = faker.location.zipCode();

    //navigates directly to the add-customer URL which bypasses clicking the Bank Manager Login button
    await addCustomerPage.open();
    await addCustomerPage.fillFirstName(firstName);
    await addCustomerPage.fillLastName(lastName);
    await addCustomerPage.fillPostCode(postCode);
    await addCustomerPage.clickAddCustomerButton();
    await customersListPage.clickCustomersButton();
    await customersListPage.assertCustomerIsPresent(firstName, lastName, postCode);
    await customersListPage.assertAccountNumberIsEmpty(firstName, lastName);
});
