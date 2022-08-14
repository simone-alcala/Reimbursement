import {Request, Response } from 'express';

import * as service from './../services/userService.js';

export async function insert(req: Request, res: Response) {
  const user: service.DataUserCreate = { ...res.locals.validation.value };
  const loggedUserId = res.locals.loggedUserId;
  await service.insert(loggedUserId, user);
  res.sendStatus(201);
}

export async function update(req: Request, res: Response) {
  const user: service.DataUserUpdate = { ...res.locals.validation.value };
  const loggedUserId = res.locals.loggedUserId;
  const { id } = req.params;
  await service.update(loggedUserId, id, user);
  res.sendStatus(200);
}