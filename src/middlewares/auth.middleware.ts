import { NextFunction, Request, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import httpStatus from 'http-status';
import config from '../config/env';
import catchAsync from '../utils/catchAsync';

const auth = (...requiredRoles: string[]) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new Error('You are not authorized');
    }

    const decodedUser = jwt.verify(token, config.jwt_secret as Secret) as any;

    if (requiredRoles.length > 0 && !requiredRoles.includes(decodedUser.role)) {
      throw new Error('You do not have permission');
    }

    req.user = decodedUser;
    next();
  });

export default auth;
