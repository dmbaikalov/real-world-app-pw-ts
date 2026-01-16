import { faker } from "@faker-js/faker";
import type { SignUpUserData } from "../types/userSignUpData.types";

export const createRandomUser = (): SignUpUserData => {
	const password = faker.internet.password();

	return {
		firstName: faker.person.firstName(),
		lastName: faker.person.lastName(),
		userName: faker.internet.username(),
		password: password,
		confirmPassword: password,
	};
};
