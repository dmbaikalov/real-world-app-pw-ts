import { expect, Page } from "@playwright/test";
import { test } from "../fixtures/fixtures";
import { BankAccount } from "../types/bankAccount.types.ts";

test.describe.configure({ mode: "serial" });
test.describe("Bank Account Lifecycle", () => {
  let bankAccountData: BankAccount;

  test.beforeEach(async ({ app }) => {
    await app.loginPage.goto("/");
    await app.loginPage.enterUserCredentials(
      process.env.TESTUSER!,
      process.env.PASSWORD!
    );
    await app.loginPage.clickSignIn();
    await app.wait(2000);
  });
  test("Add a Bank Account", async ({ app, generateBankData }) => {
    const bankAccountData = generateBankData();

    await app.homePage.navigateToBankAccounts();
    await app.bankAccountsPage.clickCreateBankAccount();
    await app.bankAccountsPage.fillBankAccountForm(
      bankAccountData.bankName,
      bankAccountData.routingNumber,
      bankAccountData.accountNumber
    );
    await app.bankAccountsPage.saveBankAccount();

    await expect(
      app.bankAccountsPage.getBankRow(bankAccountData.bankName)
    ).toBeVisible();
  });

  test("Remove a Bank Account", async ({ app }) => {
    await app.homePage.navigateToBankAccounts();
    await app.bankAccountsPage.deleteBankAccount(bankAccountData!.bankName);
    await expect(
      app.bankAccountsPage.getBankRow(bankAccountData!.bankName)
    ).toBeHidden();
  });
});
