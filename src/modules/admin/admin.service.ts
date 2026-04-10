import { Order } from '../order/order.model';
import { Product } from '../product/product.model';
import { User } from '../user/user.model';

const getDashboardStats = async () => {
  const totalRevenue = await Order.aggregate([
    { $match: { paymentStatus: 'paid' } },
    { $group: { _id: null, total: { $sum: '$totalAmount' } } },
  ]);

  const totalOrders = await Order.countDocuments();
  const totalProducts = await Product.countDocuments();
  const totalCustomers = await User.countDocuments({ role: 'user' });

  const recentOrders = await Order.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .populate('user', 'name email');

  return {
    revenue: totalRevenue[0]?.total || 0,
    orders: totalOrders,
    products: totalProducts,
    customers: totalCustomers,
    recentOrders,
  };
};

export const AdminService = {
  getDashboardStats,
};
