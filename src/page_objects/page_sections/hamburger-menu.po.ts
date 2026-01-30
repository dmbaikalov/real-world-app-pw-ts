import { expect, type Locator } from "@playwright/test";
import BasePage from "../base-page.po";

export default class HamburgerMenu extends BasePage {
  get burgerMenuBtn(): Locator {
    return this.page.getByTestId("burger-menu-button");
  }
  get sideNavHomeBtn(): Locator {
    return this.page.getByTestId("sidenav-home");
  }
  get bankAccountsBtn(): Locator {
    return this.page.getByTestId("sidenav-bankaccounts");
  }
  get logoutBtn(): Locator {
    return this.page.getByTestId("logout-button");
  }

  get myAccountBtn(): Locator {
    return this.page.getByTestId("sidenav-user-settings");
  }

  get displayedUserName(): Promise<string | null> {
    return this.page.getByTestId("sidenav-username").textContent();
  }

  get accountBalance(): Promise<string | null> {
    return this.page.getByTestId("sidenav-user-balance").textContent();
  }

  async openBurgerMenu(): Promise<void> {
    if (await this.sideNavHomeBtn.isVisible()) return;

    await this.burgerMenuBtn.click();
    await expect(this.sideNavHomeBtn).toBeVisible();
  }
  // async toggleBurgerMenu(): Promise<void> {
  //   if (await this.sideNavHomeBtn.isVisible()) {
  //     console.info(`>>> Closing burger menu`);
  //   } else {
  //     console.info(`>>> Opening burger menu`);
  //   }
  //   await this.burgerMenuBtn.click();
  // }
}
