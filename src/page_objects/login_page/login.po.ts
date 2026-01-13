import { expect, Locator } from "@playwright/test";
import BasePage from "../base-page.po";

export class LoginPage extends BasePage {
  /**
   *
   *
   * Locators
   *
   */
  private usernameInput: Locator = this.page.getByRole("textbox", {
    name: "Username",
  });
  private passwordInput: Locator = this.page.getByRole("textbox", {
    name: "password",
  });
  private signInBtn: Locator = this.page.getByRole("button", {
    name: "Sign In",
  });
  private signUpBtn: Locator = this.page.getByText(
    "Don't have an account? Sign Up"
  );
  private rememberMeBtn: Locator = this.page.getByLabel("Remember Me");
  private errorMsg: Locator = this.page
    .getByRole("alert")
    .getByText("Username or password is invalid");
  private firstNameInput: Locator = this.page.getByRole("textbox", {
    name: "First Name",
  });
  private lastNameInput: Locator = this.page.getByRole("textbox", {
    name: "Last Name",
  });
  private signUpPasswordInput: Locator = this.page.locator(
    'input[name="password"]'
  );
  private confirmPasswordInput: Locator = this.page.getByRole("textbox", {
    name: "Confirm Password",
  });
  private submitBtn: Locator = this.page.getByRole("button", {
    name: "Sign Up",
  });

  /**
   *
   *
   * Methods
   *
   */
  async enterUserCredentials(
    username: string,
    password: string
  ): Promise<void> {
    console.info(`>>> Entering user credentials`);

    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);

    expect.soft(await this.usernameInput.inputValue()).toBe(username);
    expect.soft(await this.passwordInput.inputValue()).toBe(password);
  }

  async clickSignIn(): Promise<void> {
    console.info(">>> Clicking on Sign In button");
    expect.soft(this.signInBtn).toBeEnabled();

    await this.signInBtn.click();
  }

  async clickSignUpBtn(): Promise<void> {
    console.info(
      ">>> Clicking on 'Don't have an account?' link to navigate to Sign Up page"
    );

    await expect.soft(this.signUpBtn).toBeEnabled();

    await this.signUpBtn.click();
  }

  async clickRememberMe(): Promise<void> {
    console.info(">>> Clicking on Remember Me checkbox");
    expect.soft(this.rememberMeBtn).toBeEnabled();

    await this.rememberMeBtn.click();
  }

  async getErrorMessage(): Promise<string | null> {
    console.info(">>> Retrieving error message text");

    const errorLocator: Locator = this.errorMsg;
    expect.soft(await errorLocator.isVisible()).toBeTruthy();

    return await this.getText(errorLocator);
  }

  async fillSignUpForm(
    firstName: string,
    lastName: string,
    username: string,
    password: string,
    confirmPassword: string
  ): Promise<void> {
    console.info(">>> Filling in Sign Up form");
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.usernameInput.fill(username);
    await this.signUpPasswordInput.fill(password);
    await this.confirmPasswordInput.fill(confirmPassword);
  }

  async submitSignUp(): Promise<void> {
    console.info(">>> Submitting Sign Up form");
    expect.soft(this.submitBtn).toBeEnabled();
    await this.submitBtn.click();
  }

  async isSignInPageOpened(): Promise<boolean> {
    console.info(">>> Checking if Sign In page is opened");
    return await this.isLoaded(this.signInBtn);
  }
}
