import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const JWT_KEY = process.env.JWT_KEY;
const JWT_EXPIRATION = 60*60*24;

import userFactory from './userFactory.js';

export async function tokenFactory(user: any) {
  const createdUser = await userFactory(user);
  return jwt.sign( { userId: createdUser.id }, JWT_KEY, { expiresIn: JWT_EXPIRATION } );
}