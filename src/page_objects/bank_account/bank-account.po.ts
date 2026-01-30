import { expect, type Locator } from "@playwright/test";
import BasePage from "../base-page.po";

export class BankAccounts extends BasePage {
  get listContainer(): Locator {
    return this.page.locator('[data-test="bankaccount-list"]');
  }

  get createBtn(): Locator {
    return this.page.locator('[data-test="bankaccount-new"]');
  }

  get deleteBtn(): Locator {
    return this.page.getByRole("button", {
      name: "DELETE",
    });
  }

  get bankNameInput(): Locator {
    return this.page.getByRole("textbox", { name: "Bank Name" });
  }

  get routingNumberInput(): Locator {
    return this.page.getByRole("textbox", { name: "Routing Number" });
  }

  get accountNumberInput(): Locator {
    return this.page.getByRole("textbox", { name: "Account Number" });
  }

  get saveBtn(): Locator {
    return this.page.getByRole("button", { name: "SAVE" });
  }

  async isBankAccountPresent(bankAccountName: string): Promise<boolean> {
    console.info(
      `>>> Checking if bank account "${bankAccountName}" is present in the list`,
    );
    const bankAccountLocator = this.page.getByText(bankAccountName);
    return await bankAccountLocator.isVisible();
  }

  getBankRow(bankName: string): Locator {
    console.info(`>>> Getting bank account row for: ${bankName}`);
    return this.listContainer.locator("li").filter({ hasText: bankName });
  }

  async deleteBankAccount(bankName: string) {
    console.info(`>>> Deleting bank account: ${bankName}`);
    const row = this.getBankRow(bankName);
    await row.getByRole("button", { name: /delete/i }).click();
  }
}
