import { Order, IOrder } from './order.model';
import { Product } from '../product/product.model';
import { SpreadsheetService } from './spreadsheet.service';

const createOrder = async (payload: IOrder): Promise<IOrder> => {
  // Check stock before creating order
  for (const item of payload.items) {
    const product = await Product.findById(item.product);
    if (!product) {
      throw new Error(`Product not found with ID: ${item.product}. Your cart may contain outdated items.`);
    }
    if (product.stock < item.quantity) {
      throw new Error(`Insufficient stock for product: ${product.name}`);
    }
  }

  const result = await Order.create(payload);

  // Update stock after order creation
  for (const item of payload.items) {
    await Product.findByIdAndUpdate(item.product, {
      $inc: { stock: -item.quantity },
    });
  }

  // Save to Google Sheets (Async)
  result.populate('items.product').then((populatedOrder) => {
    SpreadsheetService.saveToSheet(populatedOrder);
  });

  return result;
};

const getMyOrders = async (userId: string): Promise<IOrder[]> => {
  const result = await Order.find({ user: userId }).populate('items.product');
  return result;
};

const getAllOrders = async (): Promise<IOrder[]> => {
  const result = await Order.find().populate('user').populate('items.product');
  return result;
};

const updateOrderStatus = async (id: string, status: string): Promise<IOrder | null> => {
  const result = await Order.findByIdAndUpdate(id, { status }, { new: true });
  return result;
};

const deleteOrder = async (id: string): Promise<IOrder | null> => {
  const result = await Order.findByIdAndDelete(id);
  return result;
};

export const OrderService = {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
};
