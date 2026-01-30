import { expect, Locator } from "@playwright/test";
import BasePage from "../base-page.po";

export class SignupPage extends BasePage {
  get usernameInput(): Locator {
    return this.page.getByRole("textbox", { name: "Username" });
  }

  get firstNameInput(): Locator {
    return this.page.getByRole("textbox", { name: "First Name" });
  }

  get lastNameInput(): Locator {
    return this.page.getByRole("textbox", { name: "Last Name" });
  }

  get signUpPasswordInput(): Locator {
    return this.page.getByRole("textbox", { name: "Password" });
  }

  get confirmPasswordInput(): Locator {
    return this.page.getByRole("textbox", { name: "Confirm Password" });
  }

  get submitBtn(): Locator {
    return this.page.getByRole("button", { name: "Sign Up" });
  }
}
