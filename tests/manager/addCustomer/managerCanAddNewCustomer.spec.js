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

    await addCustomerPage.open();
    await addCustomerPage.fillFirstName(firstName);
    await addCustomerPage.fillLastName(lastName);
    await addCustomerPage.fillPostCode(postCode);
    await addCustomerPage.clickAddCustomerButton();
    await page.reload();
    await customersListPage.clickCustomersButton();
    await customersListPage.assertFirstName(firstName);
    await customersListPage.assertLastName(lastName);
    await customersListPage.assertPostCode(postCode);
    await customersListPage.assertAccountNumberIsEmpty();
});
