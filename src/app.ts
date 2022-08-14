import 'express-async-errors';
import express, { json }  from 'express';
import cors  from 'cors';

import router from './routers/index.js';
import errorHandler from './middleware/errorHandlerMiddleware.js';

const app = express();
app.use(json());
app.use(cors());
app.use(router);
app.use(errorHandler);
  
export default app;