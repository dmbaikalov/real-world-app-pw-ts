import { Locator } from "@playwright/test";
import BasePage from "../base-page.po";

export class HomePage extends BasePage {
    private userNameDisplay: Locator = this.page.getByTestId('sidenav-username');
	private accountBalance: Locator = this.page.getByTestId('sidenav-user-balance');
	private newTransactionButton: Locator = this.page.getByTestId('nav-top-new-transaction');
	private sideNavHomeButton: Locator = this.page.getByTestId('sidenav-home');
	private sideNavMyAccountButton: Locator = this.page.getByTestId('sidenav-user-settings');
	private sideNavBankAccountsButton: Locator = this.page.getByRole('link', { name: 'Bank Accounts' });
	private sideNavNotificationsButton: Locator = this.page.getByTestId('sidenav-notifications');
	private notificationsIcon: Locator = this.page.getByTestId('notifications-icon');
	private logoutButton: Locator = this.page.getByTestId('logout-button');
	private burgerMenuButton: Locator = this.page.getByTestId('burger-menu-button')
    
    async toggleBurgerMenu(): Promise<void> {
        if(!this.sideNavHomeButton.isVisible()) {
            console.info(`Opening burger menu`);
            await this.burgerMenuButton.click();
        } 
        else {
            console.info(`Closing burger menu`);
            await this.burgerMenuButton.click();
        }
        
    }

    async clickMyAccount(): Promise<void> {
        console.info(`Clicking My Account button from burger menu`);
        await this.sideNavMyAccountButton.click();
    }

    async clickLogout(): Promise<void> {
        console.info(`Clicking logout button from burger menu`);
        await this.logoutButton.click();
    }

    async navigateToBankAccounts(): Promise<void> {
        console.info(`Navigating to Bank Accounts page`);
        await this.sideNavBankAccountsButton.click();
    }
    
}
