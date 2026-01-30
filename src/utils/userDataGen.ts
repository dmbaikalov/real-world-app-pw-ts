import { faker } from "@faker-js/faker";
import type { TSignUpUserData } from "../types/userSignUpData.types";


// get random user
const getRandomUser = (randUser?: Partial<TSignUpUserData>): TSignUpUserData => {
	const user = generateRandomUser();
	return randUser ? {...randUser, ...user} : user;
}
getRandomUser({firstName: "John"});

export const generateRandomUser = (): TSignUpUserData => {
	const password = faker.internet.password();

	return {
		firstName: faker.person.firstName(),
		lastName: faker.person.lastName(),
		userName: faker.internet.username(),
		password: password,
		confirmPassword: password,
	};
};
