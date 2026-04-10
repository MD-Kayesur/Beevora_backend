import { ErrorRequestHandler } from 'express';
import config from '../config/env';
import logger from '../config/logger';
import { ZodError } from 'zod';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = 500;
  let message = 'Something went wrong!';
  let errorMessages: any[] = [];

  if (error instanceof ZodError) {
    statusCode = 400;
    message = 'Validation Error';
    errorMessages = error.issues.map((issue) => {
      return {
        path: issue?.path[issue.path.length - 1],
        message: issue?.message,
      };
    });
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  });
};

export default globalErrorHandler;
