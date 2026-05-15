import { Order, IOrder } from './order.model';
import { Product } from '../product/product.model';
import { Honey } from '../honey/honey.model';
import { Clothing } from '../clothing/clothing.model';
import { SpreadsheetService } from './spreadsheet.service';
import { InvoiceService } from './invoice.service';

const createOrder = async (payload: IOrder): Promise<IOrder> => {
  // Check stock before creating order
  for (const item of payload.items) {
    const Model: any = item.productModel === 'Honey' ? Honey : item.productModel === 'Clothing' ? Clothing : Product;
    const product = await Model.findById(item.product);
    if (!product) {
      throw new Error(`Product not found with ID: ${item.product} in collection ${item.productModel}.`);
    }
    if (product.stock < item.quantity) {
      throw new Error(`Insufficient stock for product: ${product.name}`);
    }
  }

  const result = await Order.create(payload);

  // Update stock after order creation
  for (const item of payload.items) {
    const Model: any = item.productModel === 'Honey' ? Honey : item.productModel === 'Clothing' ? Clothing : Product;
    await Model.findByIdAndUpdate(item.product, {
      $inc: { stock: -item.quantity },
    });
  }

  // Save to Google Sheets (Async)
  result.populate(['items.product', 'user']).then(async (populatedOrder) => {
    SpreadsheetService.saveToSheet(populatedOrder);
    
    // Generate Invoice PDF
    try {
      const invoicePath = await InvoiceService.generateInvoicePDF(populatedOrder);
      await Order.findByIdAndUpdate(result._id, { invoicePath });
    } catch (err) {
      console.error('Failed to generate invoice:', err);
    }
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

const getOrderById = async (id: string): Promise<IOrder | null> => {
  const result = await Order.findById(id).populate(['user', 'items.product']);
  return result;
};

export const OrderService = {
  createOrder,
  getMyOrders,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
};
