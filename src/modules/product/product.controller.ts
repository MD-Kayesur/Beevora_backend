import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ProductService } from './product.service';

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductService.createProduct(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Product created successfully!',
    data: result,
  });
});

const getAllProducts = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductService.getAllProducts(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Products fetched successfully!',
    meta: result.meta,
    data: result.products,
  });
});

const getProductById = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductService.getProductById(req.params.id as string);

  if (!result) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Product not found!',
      data: null,
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product fetched successfully!',
    data: result,
  });
});

const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductService.updateProduct(req.params.id as string, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product updated successfully!',
    data: result,
  });
});

const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductService.deleteProduct(req.params.id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product deleted successfully!',
    data: result,
  });
});

export const ProductController = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
