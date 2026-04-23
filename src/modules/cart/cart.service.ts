import httpStatus from 'http-status';
import { Product } from '../product/product.model';
import { Honey } from '../honey/honey.model';
import { Clothing } from '../clothing/clothing.model';
import { Cart } from './cart.model';
import ApiError from '../../utils/ApiError';
import { Coupon } from '../coupon/coupon.model';

const getCart = async (userId: string) => {
  let cart = await Cart.findOne({ user: userId }).populate('items.product');
  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
  }
  return cart;
};

const addToCart = async (userId: string, productId: string, quantity: number) => {
  let product: any = await Product.findById(productId);
  let productModel = 'Product';

  if (!product) {
    product = await Honey.findById(productId);
    productModel = 'Honey';
  }
  
  if (!product) {
    product = await Clothing.findById(productId);
    productModel = 'Clothing';
  }

  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found across all collections');
  }

  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
  }

  const existingItemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId
  );

  if (existingItemIndex > -1) {
    cart.items[existingItemIndex].quantity += quantity;
  } else {
    cart.items.push({ product: productId as any, productModel: productModel as any, quantity });
  }

  // Recalculate totals (simplified for now)
  await cart.populate('items.product');
  let subtotal = 0;
  cart.items.forEach((item: any) => {
    subtotal += item.product.price * item.quantity;
  });

  cart.subtotal = subtotal;
  cart.total = subtotal - cart.discount;
  
  await cart.save();
  return cart;
};

const updateCartItem = async (userId: string, itemId: string, quantity: number) => {
  const cart = await Cart.findOne({ user: userId });
  if (!cart) throw new ApiError(httpStatus.NOT_FOUND, 'Cart not found');

  const itemIndex = cart.items.findIndex((item: any) => item._id.toString() === itemId);
  if (itemIndex === -1) throw new ApiError(httpStatus.NOT_FOUND, 'Item not found in cart');

  cart.items[itemIndex].quantity = quantity;

  await cart.populate('items.product');
  let subtotal = 0;
  cart.items.forEach((item: any) => {
    subtotal += item.product.price * item.quantity;
  });

  cart.subtotal = subtotal;
  cart.total = subtotal - cart.discount;

  await cart.save();
  return cart;
};

const removeFromCart = async (userId: string, itemId: string) => {
  const cart = await Cart.findOne({ user: userId });
  if (!cart) throw new ApiError(httpStatus.NOT_FOUND, 'Cart not found');

  cart.items = cart.items.filter((item: any) => item._id.toString() !== itemId);

  await cart.populate('items.product');
  let subtotal = 0;
  cart.items.forEach((item: any) => {
    subtotal += item.product.price * item.quantity;
  });

  cart.subtotal = subtotal;
  cart.total = subtotal - cart.discount;

  await cart.save();
  return cart;
};

const clearCart = async (userId: string) => {
  const cart = await Cart.findOne({ user: userId });
  if (!cart) throw new ApiError(httpStatus.NOT_FOUND, 'Cart not found');

  cart.items = [];
  cart.subtotal = 0;
  cart.discount = 0;
  cart.total = 0;

  await cart.save();
  return cart;
};

const applyCoupon = async (userId: string, code: string) => {
  const cart = await Cart.findOne({ user: userId });
  if (!cart) throw new ApiError(httpStatus.NOT_FOUND, 'Cart not found');

  const coupon = await Coupon.findOne({ code, isActive: true });

  if (!coupon) throw new ApiError(httpStatus.NOT_FOUND, 'Invalid or inactive coupon');
  if (coupon.expiryDate < new Date()) throw new ApiError(httpStatus.BAD_REQUEST, 'Coupon expired');
  if (coupon.usageLimit > 0 && coupon.usageCount >= coupon.usageLimit) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Coupon usage limit reached');
  }

  let discount = 0;
  if (coupon.discountType === 'percentage') {
    discount = (cart.subtotal * coupon.discountValue) / 100;
  } else {
    discount = coupon.discountValue;
  }

  cart.discount = discount;
  cart.total = cart.subtotal - discount;
  // Store applied coupon code (optional, but good for UI)
  (cart as any).coupon = code;

  await cart.save();
  return cart;
};

export const CartService = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  applyCoupon,
  clearCart,
};
