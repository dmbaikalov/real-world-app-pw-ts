import { expect, Page } from "@playwright/test";
import { test } from "../fixtures/fixtures";
import type { TBankAccount } from "../types/bankAccount.types.ts";
import { STORAGE_STATE_ADMIN } from "../../playwright.config.ts";

test.describe.configure({ mode: "serial" });
test.describe("Bank Account Lifecycle", { tag: "@admin" }, () => {
  let bankAccountData: TBankAccount;
  test.use({ storageState: STORAGE_STATE_ADMIN });

  test("Add a Bank Account", async ({ app, generateBankData }) => {
    bankAccountData = generateBankData();

    await app.homePage.goto("/");
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
    await app.homePage.goto("/bankaccounts");
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
