import { NextFunction, Request, Response } from 'express';
import config from '../config/env';
import catchAsync from '../utils/catchAsync';
import auth from './auth.middleware';

const adminMiddleware = auth('admin');
export default adminMiddleware;
