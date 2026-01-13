import { test as base } from "@playwright/test";
import { Application } from "../page_objects/app.po";
import { BankAccount } from "../types/bankAccount.types.ts";
import { createRandomBankAccount } from "../utils/bankAccountDataGenerator.ts";

type MyFixtures = {
  app: Application;
  generateBankData: (overrides?: Partial<BankAccount>) => BankAccount;
};

// 4. Extend the base test
export const test = base.extend<MyFixtures>({
  // Page Object fixture
  app: async ({ page }, use) => {
    const app = new Application(page);
    await use(app);
  },

  // Data Generator fixture
  generateBankData: async ({}, use) => {
    // We pass the function itself so tests can call it
    await use(createRandomBankAccount);
  },
});

export { expect } from "@playwright/test";
