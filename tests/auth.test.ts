import prisma from './../src/config/database.js';
import supertest from 'supertest';

import app from './../src/app.js';
import * as userBody from './factories/userBodyFactory.js';
import userFactory from './factories/userFactory.js';
import { faker } from '@faker-js/faker';

const agent = supertest(app);

afterAll(async () => {
  await prisma.$disconnect();
});

describe('Auth tests suite', () => {
  
  beforeEach(async () => {
    await prisma.$executeRaw  `DELETE FROM users`;
  });

  it('should sign up succesfully', async () => {
    const user = userBody.userSignUp();
    const result = await agent.post('/sign-up').send(user);
    const userCreated = await prisma.user.findFirst({ where: { email: user.email.toUpperCase() } });
    expect(result.status).toBe(201);
    expect(userCreated).not.toBeNull();
  });

  it('should not sign up and return 409', async () => {
    const user = userBody.userSignUp();
    await userFactory({ ...user, email: user.email.toUpperCase() });
    const result = await agent.post('/sign-up').send(user);
    expect(result.status).toBe(409);
  });

  it('should sign in and return token', async () => {
    const user = userBody.userSignUp();   
    await userFactory({ ...user, email: user.email.toUpperCase() });
    const result = await agent.post('/sign-in').send( { email: user.email, password: user.password } );
    expect(result.status).toBe(200);
    expect(result.body.token).toBeTruthy();
  });

  it('should not sign in and return 401', async () => {
    const user = userBody.userSignUp();
    await userFactory({ ...user, email: user.email.toUpperCase() });
    const result = await agent.post('/sign-in').send( { email: user.email, password: faker.internet.password() } );
    expect(result.status).toBe(401);
    expect(result.body.token).not.toBeTruthy();
  });

});


