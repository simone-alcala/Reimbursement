import { faker } from '@faker-js/faker';
import prisma from './../src/config/database.js';
import supertest from 'supertest';

import app from './../src/app.js';
import * as userBody from './factories/userBodyFactory.js';
import userFactory from './factories/userFactory.js';
import { tokenFactory } from './factories/tokenFactory.js';

const agent = supertest(app);

afterAll(async () => {
  await prisma.$disconnect();
});

describe('User tests suite', () => {

  beforeEach(async () => {
    await prisma.$executeRaw  `DELETE FROM users`;
  });

  it('should create user succesfully when logged in user is admin', async () => {  
    const userLogin = userBody.userAdmin();
    const token = await tokenFactory( {...userLogin, email: userLogin.email.toUpperCase() });
    const newUser = userBody.userCreate();
    const result = await agent.post('/user').send(newUser).set('Authorization', `Bearer ${token}`);;
    const userCreated = await prisma.user.findFirst({ where: { email: newUser.email.toUpperCase() } });
    expect(result.status).toBe(201);
    expect(userCreated).not.toBeNull();
  });

  it('should not create user and return 401 when logged in user is not admin', async () => {
    const userLogin = userBody.userSignUp();
    const token = await tokenFactory( {...userLogin, email: userLogin.email.toUpperCase() });
    const newUser = userBody.userCreate();
    const result = await agent.post('/user').send(newUser).set('Authorization', `Bearer ${token}`);;
    const userCreated = await prisma.user.findFirst({ where: { email: newUser.email.toUpperCase() } });
    expect(result.status).toBe(401);  
    expect(result.text).toBe('User has no permission');
    expect(userCreated).toBeNull();
  });

  it('should not create user and return 409 when email already registered', async () => {
    const userLogin = userBody.userAdmin();
    const token = await tokenFactory( {...userLogin, email: userLogin.email.toUpperCase() });
    const newUser = userBody.userCreate();
    await userFactory({ ...newUser, email: newUser.email.toUpperCase() });
    const result = await agent.post('/user').send(newUser).set('Authorization', `Bearer ${token}`);;
    const userCreated = await prisma.user.findMany({ where: { email: newUser.email.toUpperCase() } });
    expect(result.status).toBe(409);
    expect(userCreated.length).toBe(1);
  });

  it('should update user succesfully when logged in user is admin', async () => {
    const userLogin = userBody.userAdmin();
    const token = await tokenFactory( {...userLogin, email: userLogin.email.toUpperCase() });
    const newUser = userBody.userCreate();
    const newCreatedUser = await userFactory( { ...newUser, email: newUser.email.toUpperCase() } );
    const avatar = faker.internet.url();
    const result = await agent.put(`/user/${newCreatedUser.id}`).send({ avatar }).set('Authorization', `Bearer ${token}`);
    const updateUser = await prisma.user.findFirst({ where: { email: newUser.email.toUpperCase() } });
    expect(result.status).toBe(200);
    expect(updateUser.avatar).toBe(avatar);
  });

  it('should update user succesfully when user update is logged in', async () => {
    const userLogin = userBody.userCreate();
    const token = await tokenFactory( { ...userLogin, email: userLogin.email.toUpperCase() });
    const { id: userId } = await prisma.user.findFirst( { where: { email: userLogin.email.toUpperCase() } });     
    const avatar = faker.internet.url();
    const result = await agent.put(`/user/${userId}`).send({ avatar }).set('Authorization', `Bearer ${token}`);
    const updateUser = await prisma.user.findFirst({ where: { email: userLogin.email.toUpperCase() } });
    expect(result.status).toBe(200);
    expect(updateUser.avatar).toBe(avatar);
  });

  it('should not update user and return 401 when logged user is not admin nor user update', async () => {
    const userLogin = userBody.userCreate();
    const token = await tokenFactory( {...userLogin, email: userLogin.email.toUpperCase() });
    const newUser = userBody.userCreate();
    const newCreatedUser = await userFactory( { ...newUser, email: newUser.email.toUpperCase() } );
    const avatar = faker.internet.url();
    const result = await agent.put(`/user/${newCreatedUser.id}`).send({ avatar}).set('Authorization', `Bearer ${token}`);
    const updateUser = await prisma.user.findFirst({ where: { email: newCreatedUser.email } });
    expect(result.status).toBe(401);  
    expect(result.text).toBe('User has no permission');
    expect(updateUser.avatar).toBeNull();
  });

  it('should not update user and return 409 when new email is registered to another user', async () => {
    const userLogin = userBody.userAdmin();
    const token = await tokenFactory( {...userLogin, email: userLogin.email.toUpperCase() });
    const newUser = userBody.userCreate();
    const newCreatedUser = await userFactory( { ...newUser, email: newUser.email.toUpperCase() } );
    const newCreatedUser2 = await userFactory( userBody.userCreate() );
    const result = await agent.put(`/user/${newCreatedUser2.id}`).send({ email: newCreatedUser.email }).set('Authorization', `Bearer ${token}`);
    const updateUser = await prisma.user.findFirst({ where: { email: newCreatedUser2.email } });
    expect(result.status).toBe(409);
    expect(updateUser.email).toBe(newCreatedUser2.email);
  });

});

