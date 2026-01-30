import { type Locator } from "@playwright/test";
import BasePage from "../base-page.po";
import HamburgerMenu from "../page_sections/hamburger-menu.po";

export class BankAccounts extends BasePage {
  public hamburgerMenu = new HamburgerMenu(this.page);

  get listContainer(): Locator {
    return this.page.locator('[data-test="bankaccount-list"]');
  }

  get createNewAccountBtn(): Locator {
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

  getBankRow(bankName: string): Locator {
    return this.listContainer.locator("li").filter({ hasText: bankName });
  }

  async deleteBankAccount(bankName: string) {
    console.info(`>>> Deleting bank account: ${bankName}`);
    const row = this.getBankRow(bankName);
    await row.getByRole("button", { name: /delete/i }).click();
  }
}
