import { expect, Page } from "@playwright/test";
import { test } from "../fixtures/fixtures";

// test.describe
test("Add a Bank Account", async ({ app }) => {
    await app.loginPage.goto('/')
    await app.loginPage.enterUserCredentials('Heath93', 's3cret');
    await app.loginPage.clickSignIn();
    await app.wait(2000);
    await app.homePage.navigateToBankAccounts();
    await app.bankAccountsPage.clickCreateBankAccount();
    await app.bankAccountsPage.fillBankAccountForm("My Savings1",'123123123','123123123'); // add variable
    await app.bankAccountsPage.saveBankAccount();

    const isAdded = await app.bankAccountsPage.isBankAccountPresent("My Savings1");
    expect(isAdded).toBeTruthy();

});

test("Remove a Bank Account", async ({ app }) => {
	await app.loginPage.goto('/');
    await app.loginPage.enterUserCredentials('Heath93', 's3cret');
    await app.loginPage.clickSignIn();
    await app.wait(2000);
    await app.homePage.navigateToBankAccounts();
    await app.bankAccountsPage.deleteBankAccount("My Savings1");
    const isPresent = await app.bankAccountsPage.isBankAccountPresent("My Savings1");
    expect(isPresent).toBeFalsy();
    // click remove bank account
    // confirm removal
    // expect bank account is removed

});