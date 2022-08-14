import { faker } from '@faker-js/faker';

export function userSignUp() {
  return {
    email: faker.internet.email(),
    fullName: faker.internet.userName(),
    password: faker.internet.password()
  }
}

export function userAdmin() {
  return {
    email: faker.internet.email(),
    fullName: faker.internet.userName(),
    password: faker.internet.password(),
    isAdmin: true
  }
}

export function userCreate() {
  return {
    email: faker.internet.email(),
    fullName: faker.internet.userName()
  }
}
