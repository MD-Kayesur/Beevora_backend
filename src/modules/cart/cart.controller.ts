import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CartService } from './cart.service';

const getCart = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.id;
  const result = await CartService.getCart(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cart fetched successfully',
    data: result,
  });
});

const addToCart = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.id;
  const { productId, quantity } = req.body;
  const result = await CartService.addToCart(userId, productId, quantity);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Item added to cart successfully',
    data: result,
  });
});

const updateCartItem = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.id;
  const { itemId } = req.params as any;
  const { quantity } = req.body;
  const result = await CartService.updateCartItem(userId, itemId, quantity);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cart item updated successfully',
    data: result,
  });
});

const removeFromCart = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.id;
  const { itemId } = req.params as any;
  const result = await CartService.removeFromCart(userId, itemId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Item removed from cart successfully',
    data: result,
  });
});

const applyCoupon = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.id;
  const { code } = req.body;
  const result = await CartService.applyCoupon(userId, code);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Coupon applied successfully',
    data: result,
  });
});

const clearCart = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.id;
  const result = await CartService.clearCart(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cart cleared successfully',
    data: result,
  });
});

export const CartController = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  applyCoupon,
  clearCart,
};
