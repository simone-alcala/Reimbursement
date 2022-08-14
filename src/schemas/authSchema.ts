import Joi from 'joi';
import { DataAuth } from './../services/authService.js';

export const signUpSchema = Joi.object<DataAuth>({
  email: Joi.string().trim().uppercase().email().required(),
  fullName: Joi.string().trim().uppercase().required(),
  password: Joi.string().required()
});

export const signInSchema = Joi.object<DataAuth>({
  email: Joi.string().trim().uppercase().email().required(),
  password: Joi.string().required()
});