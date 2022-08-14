import Joi from 'joi';
import { DataUserCreate, DataUserUpdate } from './../services/userService.js';

export const insert = Joi.object<DataUserCreate>({
  email: Joi.string().trim().uppercase().email().required(),
  fullName: Joi.string().trim().uppercase().required(),  
  avatar: Joi.string().trim().uri().lowercase(),
  active: Joi.boolean(),
  isAdmin: Joi.boolean(),
  departmentId: Joi.number().integer()
});

export const update = Joi.object<DataUserUpdate>({
  email: Joi.string().trim().uppercase().email(),
  fullName: Joi.string().trim().uppercase(),
  password: Joi.string(),
  avatar: Joi.string().trim().uri().lowercase(),
  active: Joi.boolean(),
  isAdmin: Joi.boolean(),
  departmentId: Joi.number().integer()
});