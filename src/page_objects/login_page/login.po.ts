import { type Locator } from "@playwright/test";
import BasePage from "../base-page.po";

export class LoginPage extends BasePage {
  get usernameInput(): Locator {
    return this.page.getByRole("textbox", { name: "Username" });
  }

  get passwordInput(): Locator {
    return this.page.getByRole("textbox", { name: "password" });
  }

  get signInBtn(): Locator {
    return this.page.getByRole("button", { name: "Sign In" });
  }

  get signUpBtn(): Locator {
    return this.page.getByText("Don't have an account? Sign Up");
  }

  get rememberMeBtn(): Locator {
    return this.page.getByLabel("Remember Me");
  }

  get errorMsgTxt(): Promise<string | null> {
    return this.page.getByTestId("signin-error").textContent();
  }
}
