import type { Locator, Page } from "@playwright/test";

export default class BasePage {
	page: Page;
	constructor(page: Page) {
		this.page = page;
	}

	public async goto(url: string): Promise<void> {
		console.info(`>>> Navigating to URL: ${url}`);

		await this.page.goto(url);
	}

	async wait(timeout: number): Promise<void> {
		console.info(`>>> Waiting for timeout: ${timeout} second(s)`);

		await this.page.waitForTimeout(timeout);
	}
}
