import { LoginPage } from "./login_page";
import BasePage from "./base-page.po";
import { HomePage } from "./home_page";
import { BankAccounts } from "./bank_account";
import { SignUp } from "./login_page/signUp.po";

export class Application extends BasePage {
	get loginPage() {
		return new LoginPage(this.page);
	}

	get homePage() {
		return new HomePage(this.page);
	}

	get bankAccountsPage() {
		return new BankAccounts(this.page);
	}

	get signUpPage() {
		return new SignUp(this.page);
	}
}
