import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
import prisma from './../../src/config/database.js';

export default async function userFactory(user: any) {
  
  let password = '';
  if (user.password) {
    password = user.password;
  } else {
    password = faker.internet.password();
  }
  
  return prisma.user.create({
    data: {
      ...user,
      password: bcrypt.hashSync(password, 10)
    }
  });
}