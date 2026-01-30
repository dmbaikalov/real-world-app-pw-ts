import { expect, Page } from "@playwright/test";
import { test } from "../fixtures/fixtures";
import { getRandomUser } from "../utils/userDataGen.ts";

test.describe("Login Tests", () => {
  // test.step()
  test("Login with valid credentials", async ({ app }) => {
    await app.loginPage.goto("/");
    await app.loginPage.usernameInput.fill(process.env.TESTUSER!);
    await app.loginPage.passwordInput.fill(process.env.PASSWORD!);
    await app.loginPage.signInBtn.click();

    const displayedUserName =
      await app.homePage.hamburgerMenu.displayedUserName;
    expect(displayedUserName).toContain(`@${process.env.TESTUSER!}`);
  });
});

test("Login with invalid credentials", async ({ app }) => {
  await app.loginPage.goto("/");
  await app.loginPage.usernameInput.fill("invalidUser");
  await app.loginPage.passwordInput.fill("invalidPassword");
  await app.loginPage.signInBtn.click();

  // validate state instead of wait
  //await app.wait(2000);

  const errorText = await app.loginPage.errorMsgTxt;
  expect(errorText).toContain("Username or password is invalid");
});

test("Sign up a new user", async ({ app }) => {
  const newUserData = getRandomUser();

  await app.signUpPage.goto("/signup");
  await app.signUpPage.firstNameInput.fill(newUserData.firstName);
  await app.signUpPage.lastNameInput.fill(newUserData.lastName);
  await app.signUpPage.usernameInput.fill(newUserData.userName);
  await app.signUpPage.passwordInput.fill(newUserData.password);
  await app.signUpPage.confirmPasswordInput.fill(newUserData.confirmPassword);

  await app.signUpPage.submitBtn.click();
  await app.wait(2000);
  expect(app.page.url()).toContain("/signin");
});
