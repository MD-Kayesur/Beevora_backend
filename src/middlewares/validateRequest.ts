import { NextFunction, Request, Response } from 'express';
import { ZodObject, ZodRawShape } from 'zod';
import catchAsync from '../utils/catchAsync';

const validateRequest = (schema: ZodObject<ZodRawShape>) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
      cookies: req.cookies,
    });
    next();
  });

export default validateRequest;
