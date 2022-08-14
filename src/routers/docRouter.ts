import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';

const docRouter = Router();

const swaggerOptions = {
  swaggerOptions: { supportedSubmitMethods: []  } 
};

const swaggerFile: any = (process.cwd()+'/src/swagger/swagger.json');
const swaggerData: any = fs.readFileSync(swaggerFile, 'utf8');
const swaggerDocument = JSON.parse(swaggerData);

docRouter.use('/api-docs', swaggerUi.serve);
docRouter.get('/api-docs', swaggerUi.setup(swaggerDocument, swaggerOptions));

export default docRouter;