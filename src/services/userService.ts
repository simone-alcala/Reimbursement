import dotenv from 'dotenv';

import { User } from '@prisma/client';
import * as repository from './../repositories/usersRepository.js';
import * as throwError from './../utils/errorUtils.js';
import * as authService from './authService.js';
import * as departmentService from './departmentService.js';

dotenv.config();

const SALTROUNDS = +process.env.BCRYPT || 10;
const JWT_KEY = process.env.JWT_KEY;
const JWT_EXPIRATION = 60*60*24;

export type DataUserUpdate = Partial<User>;
export type DataUserCreate = Omit<User, 'id'>;

const validateId = /^[0-9]+$/;
const DEFAULT_PWD = '123456';

export async function insert(loggedUserId: number, data: DataUserCreate) {

  await checkIfUserIsAuthorized (loggedUserId, 'insert');
  await checkIfUserAlreadyExists(data.email);
  if (data.departmentId) {
    await departmentService.checkIfDepartmentExistsById(data.departmentId)
  }
  const hashedPassword = authService.getEncryptPassword(DEFAULT_PWD);
  await repository.insert({ ...data, password: hashedPassword });
}

export async function update(loggedUserId: number, userId: string, data: DataUserUpdate) {
  if (!userId.match(validateId)) {
    throw throwError.badRequestError('Invalid param');    
  } 
  const userIdNumber = parseInt(userId);

  await checkIfUserIsAuthorized (loggedUserId, 'update', userIdNumber);

  if (data.email) {
    await checkIfUserUpdateAlreadyExists(data.email, userIdNumber);
  }
  if (data.departmentId) {
    await departmentService.checkIfDepartmentExistsById(data.departmentId);
  }
  if (data.password) {
    const hashedPassword = authService.getEncryptPassword(data.password);
    data = { ...data, password: hashedPassword };
  }
  await repository.update(userIdNumber, data);
}

export async function getUserByEmail(email: string) {
  return await repository.findByEmail(email);
}

export async function checkIfUserAlreadyExists(email: string) {
  const user = await getUserByEmail(email);
  if (user.length > 0) {
    throw throwError.conflictError('Email already registered');    
  }
}

async function checkIfUserUpdateAlreadyExists(email: string, userId: number) {
  const user = await getUserByEmail(email);
  if (user.length > 0 && userId !== user[0].id) {
    throw throwError.conflictError('Email already registered');    
  }
}

async function checkIfUserIsAuthorized(loggedUserId: number, operation: string, userIdUpdate?: number) {
  const user = await repository.findById(loggedUserId);
  if (operation === 'insert' && !user.isAdmin) {
    throw throwError.unauthorizedError('User has no permission');    
  } else if (operation === 'update' && !( user.isAdmin || loggedUserId === userIdUpdate) ) {
    throw throwError.unauthorizedError('User has no permission');    
  }
}