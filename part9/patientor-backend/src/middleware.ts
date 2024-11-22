import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { NewPtDataSchema } from './utils';

export const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => { 
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      next(error);
    }
  };

export const NewPtDataParser = (req: Request, _res: Response, next: NextFunction) => { 
    try {
        NewPtDataSchema.parse(req.body);
        console.log(req.body);
        next();
    } catch (error: unknown) {
        next(error);
    }
  };