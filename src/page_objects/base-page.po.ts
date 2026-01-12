import { Locator, Page } from "@playwright/test";

export default class BasePage {
	page: Page
	constructor(page: Page) {
		this.page = page;
	}

	public async goto(url: string): Promise<void> {
		console.info(`>>> Navigating to URL: ${url}`);

		await this.page.goto(url);
	}

	async wait(timeout: number): Promise<void> {
		console.info(`>>> Waiting for timeout: ${timeout}`);

		await this.page.waitForTimeout(timeout);
	}

	async getText(selector: Locator): Promise<string | null> {
		console.info(`>>> Getting text from selector: ${selector}`);
		
		return await selector.textContent();
	}

	async isLoaded(selector: Locator): Promise<boolean> {
		console.info(`>>> Checking if ${selector} is loaded`);

		return await selector.isVisible();
	}
}
