import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ReviewService } from './review.service';

const createReview = catchAsync(async (req: Request, res: Response) => {
  const { productId, rating, comment, images } = req.body;
  const result = await ReviewService.createReview(req.user.id, productId, {
    rating: Number(rating),
    comment,
    images,
  });

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Review submitted successfully!',
    data: result,
  });
});

const getProductReviews = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewService.getProductReviews(req.params.productId as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product reviews fetched successfully!',
    data: result,
  });
});

export const ReviewController = {
  createReview,
  getProductReviews,
};
