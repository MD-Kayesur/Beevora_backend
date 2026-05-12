import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { OrderService } from './order.service';
import { createPaymentIntent } from './stripe.service';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.createOrder({
    ...req.body,
    user: req.user.id,
  });

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Order placed successfully!',
    data: result,
  });
});

const getMyOrders = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.getMyOrders(req.user.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders fetched successfully!',
    data: result,
  });
});

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.getAllOrders();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All orders fetched successfully!',
    data: result,
  });
});

const updateOrderStatus = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.updateOrderStatus(req.params.id as string, req.body.status);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order status updated successfully!',
    data: result,
  });
});

const deleteOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.deleteOrder(req.params.id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order deleted successfully!',
    data: result,
  });
});

const createPaymentIntentController = catchAsync(async (req: Request, res: Response) => {
  const { amount } = req.body;
  const paymentIntent = await createPaymentIntent(amount);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment intent created successfully!',
    data: {
      clientSecret: paymentIntent.client_secret,
    },
  });
});

export const OrderController = {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
  createPaymentIntent: createPaymentIntentController,
};
