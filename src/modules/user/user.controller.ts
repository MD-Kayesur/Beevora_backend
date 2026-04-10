import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserService } from './user.service';

const getMyProfile = catchAsync(async (req: any, res: Response) => {
  const result = await UserService.getMyProfile(req.user.email);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User profile fetched successfully!',
    data: result,
  });
});

const updateMyProfile = catchAsync(async (req: any, res: Response) => {
  const result = await UserService.updateMyProfile(req.user.email, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User profile updated successfully!',
    data: result as any,
  });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAllUsers();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users fetched successfully!',
    data: result as any,
  });
});

const updateUserRole = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.updateUserRole(req.params.id as any, req.body.role as any);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User role updated successfully!',
    data: result as any,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.deleteUser(req.params.id as any);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted successfully!',
    data: result as any,
  });
});

export const UserController = {
  getMyProfile,
  updateMyProfile,
  getAllUsers,
  updateUserRole,
  deleteUser,
};
