import { faker } from "@faker-js/faker";
import { SignUpUserData } from "../types/userSignUpData.types";

export function generateUserData() {
  const randomNum = Math.floor(Math.random() * 10000);
  return {
    username: `user${randomNum}`,
    password: `Pass!23${randomNum}`,
    email: `user${randomNum}@example.com`,
  };
}

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
