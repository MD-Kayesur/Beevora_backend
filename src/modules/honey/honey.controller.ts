import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { HoneyService } from './honey.service';

const createHoney = catchAsync(async (req: Request, res: Response) => {
  const result = await HoneyService.createHoney(req.body);
  sendResponse(res, { 
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Honey created successfully!',
    data: result,
  });
});

const getAllHoney = catchAsync(async (req: Request, res: Response) => {
  const result = await HoneyService.getAllHoney(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Honey items fetched successfully!',
    meta: result.meta,
    data: result.products,
  });
});

const getHoneyById = catchAsync(async (req: Request, res: Response) => {
  const result = await HoneyService.getHoneyById(req.params.id as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Honey item fetched successfully!',
    data: result,
  });
});

const updateHoney = catchAsync(async (req: Request, res: Response) => {
  const result = await HoneyService.updateHoney(req.params.id as string, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Honey item updated successfully!',
    data: result,
  });
});

const deleteHoney = catchAsync(async (req: Request, res: Response) => {
  const result = await HoneyService.deleteHoney(req.params.id as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Honey item deleted successfully!',
    data: result,
  });
});

export const HoneyController = {
  createHoney,
  getAllHoney,
  getHoneyById,
  updateHoney,
  deleteHoney,
};
