import { Locator } from "@playwright/test";
import BasePage from "../base-page.po";

export default class HamburgerMenu extends BasePage {
  get burgerMenuButton(): Locator {
    return this.page.getByTestId("burger-menu-button");
  }
  get sideNavHomeButton(): Locator {
    return this.page.getByTestId("sidenav-home");
  }
  get sideNavMyAccountButton(): Locator {
    return this.page.getByTestId("sidenav-user-settings");
  }
  get logoutButton(): Locator {
    return this.page.getByTestId("logout-button");
  }

  get myAccountButton(): Locator {
    return this.page.getByTestId("sidenav-user-settings");
  }

  get displayedUserName(): Promise<string | null> {
    return this.page.getByTestId("sidenav-username").textContent();
  }

  get accountBalance(): Promise<string | null> {
    return this.page.getByTestId("sidenav-user-balance").textContent();
  }

  async toggleBurgerMenu(): Promise<void> {
    if (await this.sideNavHomeButton.isVisible()) {
      console.info(`>>> Closing burger menu`);
    } else {
      console.info(`>>> Opening burger menu`);
    }
    await this.burgerMenuButton.click();
  }
}
