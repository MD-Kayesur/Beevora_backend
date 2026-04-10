import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthService } from './auth.service';
import config from '../../config/env';

const register = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.register(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User registered successfully!',
    data: result,
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.login(req.body);
  const { refreshToken, accessToken } = result;

  // Set refresh token in cookie
  res.cookie('refreshToken', refreshToken, {
    secure: config.env === 'production',
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully!',
    data: {
      accessToken,
      user: result.user,
    },
  });
});

export const AuthController = {
  register,
  login,
};
