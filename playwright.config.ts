import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";

export const STORAGE_STATE_USER = path.join(
  __dirname,
  "playwright/.auth/user.json",
);
export const STORAGE_STATE_ADMIN = path.join(
  __dirname,
  "playwright/.auth/admin.json",
);
export const GUEST_STATE = { cookies: [], origins: [] };

export default defineConfig({
  testDir: "./src/specs",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["html", { open: "never" }]],
  use: {
    baseURL: process.env.BASE_URL || "http://localhost:3000",
    testIdAttribute: "data-test",
    trace: "on",
    screenshot: "only-on-failure",
  },

  projects: [
    {
      name: "setup",
      testMatch: /.*\.setup\.ts/,
    },

    {
      name: "default-user",
      grep: /@default/,
      use: { ...devices["Desktop Chrome"], storageState: STORAGE_STATE_USER },
      dependencies: ["setup"],
    },

    {
      name: "admin-user",
      grep: /@admin/,
      use: { ...devices["Desktop Chrome"], storageState: STORAGE_STATE_ADMIN },
      dependencies: ["setup"],
    },

    {
      name: "guest-user",
      grep: /@guest/,
      use: {
        ...devices["Desktop Chrome"],
        storageState: GUEST_STATE,
      },
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
