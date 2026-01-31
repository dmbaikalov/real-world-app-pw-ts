import { expect, Page } from "@playwright/test";
import { test } from "../fixtures/fixtures";
import { getRandomUser } from "../utils/userDataGen.ts";
import { GUEST_STATE } from "../../playwright.config.ts";

test.describe("Login Tests", () => {
  test.use({ storageState: GUEST_STATE });
  // test.step()
  test("Login with invalid credentials", { tag: "@guest" }, async ({ app }) => {
    await app.loginPage.goto("/");
    await app.loginPage.usernameInput.fill("invalidUser");
    await app.loginPage.passwordInput.fill("invalidPassword");
    await app.loginPage.signInBtn.click();

    // validate state instead of wait
    //await app.wait(2000);

    const errorText = await app.loginPage.errorMsgTxt;
    expect(errorText).toContain("Username or password is invalid");
  });

  test.describe("Login Tests", () => {
    test.use({ storageState: GUEST_STATE });

    test("Sign up a new user", { tag: "@guest" }, async ({ app }) => {
      const newUserData = getRandomUser();

      await app.signUpPage.goto("/signup");
      await app.signUpPage.firstNameInput.fill(newUserData.firstName);
      await app.signUpPage.lastNameInput.fill(newUserData.lastName);
      await app.signUpPage.usernameInput.fill(newUserData.userName);
      await app.signUpPage.passwordInput.fill(newUserData.password);
      await app.signUpPage.confirmPasswordInput.fill(
        newUserData.confirmPassword,
      );

      await app.signUpPage.submitBtn.click();
      await app.wait(2000);
      expect(app.page.url()).toContain("/signin");
    });
  });
});
