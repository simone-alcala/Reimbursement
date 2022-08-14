import {Request, Response } from 'express';

import * as service from './../services/authService.js';
import { DataAuth } from './../services/authService.js';

export async function signUp(req: Request, res: Response) {
  const user: DataAuth = { ...res.locals.validation.value };
  await service.signUp(user);
  res.sendStatus(201);
}

export async function signIn(req: Request, res: Response) {
  const user: DataAuth = { ...res.locals.validation.value };
  const token = await service.signIn(user);
  res.status(200).send({ token });
}