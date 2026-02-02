import { test as base } from "@playwright/test";
import { Application } from "../page_objects/app.po";
import type { TBankAccount } from "../types/bankAccount.types.ts";
import { createRandomBankAccount } from "../utils/bankAccountDataGenerator.ts";

type MyFixtures = {
	app: Application;
	generateBankData: (overrides?: Partial<TBankAccount>) => TBankAccount;
};

export const test = base.extend<MyFixtures>({
	app: async ({ page }, use) => {
		const app = new Application(page);
		await use(app);
	},

	// Data Generator fixture
	generateBankData: async ({}, use) => {
		await use(createRandomBankAccount);
	},
});

export { expect } from "@playwright/test";
