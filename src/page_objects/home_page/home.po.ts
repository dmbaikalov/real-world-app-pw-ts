import type { Locator } from "@playwright/test";
import BasePage from "../base-page.po";
import HamburgerMenu from "../page_sections/hamburger-menu.po";

export class HomePage extends BasePage {
  private hamburgerMenu = new HamburgerMenu(this.page);

  private newTransactionButton: Locator = this.page.getByTestId(
    "nav-top-new-transaction",
  );
  private sideNavHomeButton: Locator = this.page.getByTestId("sidenav-home");
  private sideNavMyAccountButton: Locator = this.page.getByTestId(
    "sidenav-user-settings",
  );
  private sideNavBankAccountsButton: Locator = this.page.getByRole("link", {
    name: "Bank Accounts",
  });
  private sideNavNotificationsButton: Locator = this.page.getByTestId(
    "sidenav-notifications",
  );
  private notificationsIcon: Locator =
    this.page.getByTestId("notifications-icon");
  private logoutButton: Locator = this.page.getByTestId("logout-button");
  private burgerMenuButton: Locator =
    this.page.getByTestId("burger-menu-button");
}
