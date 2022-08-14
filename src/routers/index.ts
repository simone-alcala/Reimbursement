import { Router } from 'express';

import docRouter from './docRouter.js';
import authRouter from './authRouter.js';
import userRouter from './userRouter.js';

const router = Router();

router.use(docRouter);
router.use(authRouter);
router.use(userRouter);

export default router;