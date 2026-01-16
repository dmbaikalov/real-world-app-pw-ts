import { expect, Page } from "@playwright/test";
import { test } from "../fixtures/fixtures";
import { createRandomUser } from "../utils/userDataGen.ts";

test.describe("Login Tests", () => {
  test("Login with valid credentials", async ({ app }) => {
    await app.loginPage.goto("/");
    await app.loginPage.enterUserCredentials(
      process.env.TESTUSER!,
      process.env.PASSWORD!
    );
    await app.loginPage.clickSignIn();

    expect(await app.homePage.getDisplayedUserName()).toEqual(
      `@${process.env.TESTUSER!}`
    );
  });
});

test("Login with invalid credentials", async ({ app }) => {
  await app.loginPage.goto("/");
  await app.loginPage.enterUserCredentials("invalidUser", "invalidPassword");
  await app.loginPage.clickSignIn();
  await app.wait(2000);

  const errorText = await app.loginPage.getErrorMessage();
  expect(errorText).toBe("Username or password is invalid");
});

test("Sign up a new user", async ({ app }) => {
  const newUserData = createRandomUser();

  await app.loginPage.goto("/signup");
  await app.loginPage.fillSignUpForm(
    newUserData.firstName,
    newUserData.lastName,
    newUserData.userName,
    newUserData.password,
    newUserData.confirmPassword
  );
  await app.loginPage.submitSignUp();
  await app.wait(2000);
  expect(await app.loginPage.isSignInPageOpened()).toBeTruthy();
});
