import { expect, Page } from "@playwright/test";
import { test } from "../fixtures/fixtures";
import { slc } from "../page_objects/login_page/selectors";
import { slc as homeSlc } from "../page_objects/home_page/selectors";

test.describe("Login Tests", () => {

	test("Login with valid credentials", async ({ app }) => {
	await app.loginPage.goto('/');
	await app.loginPage.enterUserCredentials("Heath93", "s3cret");
	await app.loginPage.clickSignIn();

	await expect(app.homePage.page.locator(homeSlc.userNameDisplay)).toHaveText("@Heath93");
});
});

test("Login with invalid credentials", async ({ app }) => {
	
	await app.loginPage.goto('/');
	await app.loginPage.enterUserCredentials("invalidUser", "invalidPassword");
	await app.loginPage.clickSignIn();
	await app.wait(2000);
	
	const errorText = await app.loginPage.getErrorMessage();
	expect(errorText).toBe("Username or password is invalid");
});

test("Sign up a new user", async ({ app }) => {
	await app.loginPage.goto("/signup");
	await app.loginPage.fillSignUpForm("John", "Doe", "john.doe93", "123123123", "123123123");
	await app.loginPage.submitSignUp();
	await app.wait(2000);
	expect(await app.loginPage.isSignInPageOpened()).toBeTruthy();

});
