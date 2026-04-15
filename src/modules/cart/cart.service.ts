import httpStatus from 'http-status';
import { Product } from '../product/product.model';
import { Cart } from './cart.model';

const getCart = async (userId: string) => {
  let cart = await Cart.findOne({ user: userId }).populate('items.product');
  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
  }
  return cart;
};

const addToCart = async (userId: string, productId: string, quantity: number) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new Error('Product not found');
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
    cart.items.push({ product: productId as any, quantity });
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
  if (!cart) throw new Error('Cart not found');

  const itemIndex = cart.items.findIndex((item: any) => item._id.toString() === itemId);
  if (itemIndex === -1) throw new Error('Item not found in cart');

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
  if (!cart) throw new Error('Cart not found');

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
  if (!cart) throw new Error('Cart not found');

  cart.items = [];
  cart.subtotal = 0;
  cart.discount = 0;
  cart.total = 0;

  await cart.save();
  return cart;
};

export const CartService = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
};
