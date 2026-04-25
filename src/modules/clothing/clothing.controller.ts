import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ClothingService } from './clothing.service';

const createClothing = catchAsync(async (req: Request, res: Response) => {
  const result = await ClothingService.createClothing(req.body);
  sendResponse(res, { 
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Clothing created successfully!',
    data: result,
  });
});

const getAllClothing = catchAsync(async (req: Request, res: Response) => {
  const result = await ClothingService.getAllClothing(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Clothing items fetched successfully!',
    meta: result.meta,
    data: result.products,
  });
});

const getClothingById = catchAsync(async (req: Request, res: Response) => {
  const result = await ClothingService.getClothingById(req.params.id as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Clothing item fetched successfully!',
    data: result,
  });
});

const updateClothing = catchAsync(async (req: Request, res: Response) => {
  const result = await ClothingService.updateClothing(req.params.id as string, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Clothing item updated successfully!',
    data: result,
  });
});

const deleteClothing = catchAsync(async (req: Request, res: Response) => {
  const result = await ClothingService.deleteClothing(req.params.id as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Clothing item deleted successfully!',
    data: result,
  });
});

export const ClothingController = {
  createClothing,
  getAllClothing,
  getClothingById,
  updateClothing,
  deleteClothing,
};
