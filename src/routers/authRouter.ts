import { Router } from 'express';

import * as controller from './../controllers/authController.js';
import * as schema from './../schemas/authSchema.js';
import validateSchemaMiddleware from './../middleware/validateSchemaMiddleware.js';

const authRouter = Router();

authRouter.post('/sign-up', validateSchemaMiddleware(schema.signUpSchema), controller.signUp);
authRouter.post('/sign-in', validateSchemaMiddleware(schema.signInSchema), controller.signIn);


export default authRouter;