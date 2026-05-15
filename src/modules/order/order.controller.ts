import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { OrderService } from './order.service';
import { createPaymentIntent } from './stripe.service';
import path from 'path';
import fs from 'fs';
import ApiError from '../../utils/ApiError';

const downloadInvoice = catchAsync(async (req: Request, res: Response) => {
  const orderId = req.params.id as string;
  const order = await OrderService.getOrderById(orderId);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }

  // Ownership check
  const userId = (order.user as any)._id?.toString() || order.user.toString();
  if (req.user.role !== 'admin' && userId !== req.user.id) {
    throw new ApiError(httpStatus.FORBIDDEN, 'You do not have permission to download this invoice');
  }

  if (!order.invoicePath || !fs.existsSync(order.invoicePath)) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invoice not generated yet');
  }

  const fileName = `invoice_${(order as any)._id || orderId}.pdf`;
  res.download(order.invoicePath, fileName);
});

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
  downloadInvoice,
  createPaymentIntent: createPaymentIntentController,
};
