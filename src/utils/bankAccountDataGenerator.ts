import { faker } from "@faker-js/faker";
import { BankAccount } from "../types/bankAccount.types.ts";

export const createRandomBankAccount = (): BankAccount => ({
  bankName: `${faker.company.name()} Bank`,
  routingNumber: faker.finance.routingNumber(),
  accountNumber: faker.finance.accountNumber(12),
});
