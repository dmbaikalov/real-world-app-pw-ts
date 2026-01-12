import { expect, Locator } from "@playwright/test";
import BasePage from "../base-page.po";

export class BankAccounts extends BasePage {
    private createButton: Locator = this.page.getByRole('link', { name: 'CREATE'});
    private deleteButton: Locator = this.page.getByRole('button', { name: 'DELETE'});
    private bankNameField: Locator = this.page.getByRole('textbox', { name: 'Bank Name' });
    private routingNumberField: Locator = this.page.getByRole('textbox', { name: 'Routing Number' });
    private accountNumberField: Locator = this.page.getByRole('textbox', { name: 'Account Number' });
    private saveButton: Locator = this.page.getByRole('button', { name: 'SAVE' });

    async clickCreateBankAccount() {
        console.info(">>> Verifying Create Bank Account button is visible");
        expect(await this.createButton.isVisible());

        console.info(">>> Clicking on Create Bank Account button");
        await this.createButton.click();
    }

    async fillBankAccountForm(bankName: string, routingNumber: string, accountNumber: string) {
        console.info(">>> Filling in Bank Name field");
        await this.bankNameField.fill(bankName);

        console.info(">>> Filling in Routing Number field");
        await this.routingNumberField.fill(routingNumber);

        console.info(">>> Filling in Account Number field");
        await this.accountNumberField.fill(accountNumber);
    }

    async saveBankAccount() {
        console.info(">>> Clicking on Save button to save the bank account");
        await this.saveButton.click();
    }

    async isBankAccountPresent(bankAccountName: string): Promise<boolean> {
        console.info(`>>> Checking if bank account "${bankAccountName}" is present in the list`);
        const bankAccountLocator = this.page.getByText(bankAccountName);
        return await bankAccountLocator.isVisible();
    }

    // create generic delete method to delete bank account by name
    async deleteBankAccount(bankAccountName: string) {
        console.info(`>>> Deleting bank account: ${bankAccountName}`);
        const bankAccountRow = this.page.getByText(bankAccountName);
        const deleteButton = bankAccountRow.locator(this.deleteButton);

        console.info(">>> Verifying Delete button is visible");
        expect(await deleteButton.isVisible());

        console.info(">>> Clicking on Delete button");
        await deleteButton.click();
    }
}
