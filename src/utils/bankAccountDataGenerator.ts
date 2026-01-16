import { faker } from "@faker-js/faker";
import type { BankAccount } from "../types/bankAccount.types.ts";

export const createRandomBankAccount = (
  overrides: Partial<BankAccount> = {}
): BankAccount => ({
	bankName: `${faker.company.name()} Bank`,
	routingNumber: faker.finance.routingNumber(),
	accountNumber: faker.finance.accountNumber(12),
	...overrides,
});
