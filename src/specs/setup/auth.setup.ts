import { test as setup, expect } from "../../fixtures/fixtures";
import {
  STORAGE_STATE_USER,
  STORAGE_STATE_ADMIN,
} from "../../../playwright.config";
import { getEnvVarString } from "../../utils/env";
import fs from "fs";
import path from "path";

setup("Authenticate users and save storage state", async ({ app }) => {
  // Check if storage states already exist
  if (fs.existsSync(STORAGE_STATE_USER) && fs.existsSync(STORAGE_STATE_ADMIN)) {
    console.log("Storage states already exist. Skipping setup...");
    return;
  }

  // Check if auth directory exists
  const authDir = path.dirname(STORAGE_STATE_USER);
  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
  }

  //Default user
  await app.loginPage.goto("/");
  await app.loginPage.usernameInput.fill(getEnvVarString("TESTUSER"));
  await app.loginPage.passwordInput.fill(getEnvVarString("PASSWORD"));
  await app.loginPage.signInBtn.click();

  const userGreeting = await app.homePage.hamburgerMenu.displayedUserName;
  expect(userGreeting).toContain(`@${getEnvVarString("TESTUSER")}`);
  await app.page.context().storageState({ path: STORAGE_STATE_USER });
  console.log("Regular user state saved.");

  // Admin user
  // Clearing cookies before logging in as admin
  await app.page.context().clearCookies();
  await app.page.evaluate(() => window.localStorage.clear());

  await app.loginPage.goto("/");
  await app.loginPage.usernameInput.fill(getEnvVarString("ADMIN_USER"));
  await app.loginPage.passwordInput.fill(getEnvVarString("ADMIN_PASSWORD"));
  await app.loginPage.signInBtn.click();

  const adminGreeting = await app.homePage.hamburgerMenu.displayedUserName;
  expect(adminGreeting).toContain(`@${getEnvVarString("ADMIN_USER")}`);

  await app.page.context().storageState({ path: STORAGE_STATE_ADMIN });
  console.log("Admin state saved.");
});
