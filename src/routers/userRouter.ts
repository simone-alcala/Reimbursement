import { Router } from 'express';

import * as controller from './../controllers/userController.js';
import * as schema from './../schemas/userSchema.js';
import validateSchemaMiddleware from './../middleware/validateSchemaMiddleware.js';
import validateToken from './../middleware/validateTokenMiddlware.js';

const userRouter = Router();

userRouter.post('/user', validateToken, validateSchemaMiddleware(schema.insert), controller.insert);
userRouter.put('/user/:id', validateToken, validateSchemaMiddleware(schema.update), controller.update);

export default userRouter;