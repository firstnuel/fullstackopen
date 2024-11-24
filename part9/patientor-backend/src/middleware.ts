import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { NewPtDataSchema, NewEntrySchema } from './utils';

export const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => { 
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      next(error);
    }
  };

export const NewPtDataParser = (req: Request, _res: Response, next: NextFunction) => { 
    try {
      const body = req.body as { entries?: unknown[] };
      if (!body.entries) body.entries = [];
        NewPtDataSchema.parse(body);
        console.log(body);
        next();
    } catch (error: unknown) {
        next(error);
    }
  };

export const NewEntryParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewEntrySchema.parse(req.body);
    console.log(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  };
};