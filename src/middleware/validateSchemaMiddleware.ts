import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

export default function validateSchemaMiddleware(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const validation = schema.validate(req.body);
    if (validation.error) {
      return res.status(422).send({ error: validation.error.message });
    }
    res.locals.validation = validation;
    next();
  }
}

