import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import { User } from '@prisma/client';
import * as repository from './../repositories/usersRepository.js';
import * as throwError from './../utils/errorUtils.js';
import * as userService from './userService.js';

dotenv.config();

const SALTROUNDS = +process.env.BCRYPT || 10;
const JWT_KEY = process.env.JWT_KEY;
const JWT_EXPIRATION = 60*60*24;

export type DataAuth = Partial<User>;

export async function signUp(data: DataAuth) {
  await userService.checkIfUserAlreadyExists(data.email);
  const hashedPassword = getEncryptPassword(data.password);
  await repository.insert({ ...data, password: hashedPassword });
}

export async function signIn(data: DataAuth) {
  const user = await userService.getUserByEmail(data.email);
  await checkUserCredentials(data, user);
  return generateToken(user[0].id);
}

async function checkUserCredentials(data: DataAuth, user: any) {
  if (user.length === 0) {
    throw throwError.unauthorizedError('Invalid user/password');    
  }
  if (!user[0].active) {
    throw throwError.unauthorizedError('User is not active');    
  }
  await validateUserPassword(user[0].password, data.password);
}

export function getEncryptPassword(password: string) {
  return bcrypt.hashSync(password, SALTROUNDS);
}

async function validateUserPassword(hashedPassword: string, password: string, ) {
  const match = await bcrypt.compare(password, hashedPassword);
  if (!match) {
    throw throwError.unauthorizedError('Invalid user/password');    
  }
}

function generateToken(userId: number){
  return jwt.sign( { userId }, JWT_KEY, { expiresIn: JWT_EXPIRATION } );
}