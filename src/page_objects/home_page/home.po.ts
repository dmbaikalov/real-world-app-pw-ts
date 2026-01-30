import { type Locator } from "@playwright/test";
import BasePage from "../base-page.po";
import HamburgerMenu from "../page_sections/hamburger-menu.po";

export class HomePage extends BasePage {
  public hamburgerMenu = new HamburgerMenu(this.page);

  get notificationsIcon(): Locator {
    return this.page.getByTestId("notifications-icon");
  }
}
