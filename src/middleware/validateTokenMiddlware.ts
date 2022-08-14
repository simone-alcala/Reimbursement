import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import * as throwError from './../utils/errorUtils.js';
import * as repository from './../repositories/usersRepository.js';

dotenv.config();

const JWT_KEY = process.env.JWT_KEY;

export default async function validateToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers['authorization'] as string;
  if (!token) {
    throw throwError.badRequestError('Invalid token');
  }
  const userId = await decodeToken(token);
  res.locals.loggedUserId = userId;
  next();
}

async function decodeToken (tokenController: string) {
  const token = tokenController.split('Bearer ').join('');
  let userId: number;
  jwt.verify(token, JWT_KEY, (err: any, decoded: any) => {
    if (err) {
      throw throwError.unauthorizedError('Invalid token');
    }
    userId = decoded.userId;   
  });
  const user = await repository.findById(userId);
  if (!user) {
    throw throwError.unauthorizedError('Invalid token');
  }
  return userId;
}
