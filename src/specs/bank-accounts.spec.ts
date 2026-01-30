import { expect, Page } from "@playwright/test";
import { test } from "../fixtures/fixtures";
import type { BankAccount } from "../types/bankAccount.types.ts";

test.describe.configure({ mode: "serial" });
test.describe("Bank Account Lifecycle", () => {
  let bankAccountData: BankAccount;

  test.beforeEach(async ({ app }) => {
    await app.loginPage.goto("/");
    await app.loginPage.usernameInput.fill(process.env.TESTUSER!);
    await app.loginPage.passwordInput.fill(process.env.PASSWORD!);
    await app.loginPage.signInBtn.click();
    await app.wait(2000);
  });

  test("Add a Bank Account", async ({ app, generateBankData }) => {
    bankAccountData = generateBankData();

    await app.homePage.hamburgerMenu.bankAccountsBtn.click();
    await app.bankAccountsPage.createNewAccountBtn.click();
    await app.bankAccountsPage.bankNameInput.fill(bankAccountData.bankName);
    await app.bankAccountsPage.routingNumberInput.fill(
      bankAccountData.routingNumber,
    );
    await app.bankAccountsPage.accountNumberInput.fill(
      bankAccountData.accountNumber,
    );
    await app.bankAccountsPage.saveBtn.click();

    const bankAccountSlc = app.page.getByText(bankAccountData.bankName);
    expect(bankAccountSlc).toBeVisible();
  });

  test("Remove a Bank Account", async ({ app }) => {
    await app.homePage.hamburgerMenu.bankAccountsBtn.click();
    await app.bankAccountsPage.deleteBankAccount(bankAccountData.bankName);

    const deletedRow = app.bankAccountsPage.getBankRow(
      bankAccountData.bankName,
    );

    await expect(deletedRow).toContainText(
      `${bankAccountData.bankName} (Deleted)`,
    );
  });
});
