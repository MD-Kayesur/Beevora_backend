import { Order } from '../order/order.model';
import { Product } from '../product/product.model';
import { User } from '../user/user.model';
import { Honey } from '../honey/honey.model';
import { Clothing } from '../clothing/clothing.model';

const getDashboardStats = async () => {
  const totalRevenue = await Order.aggregate([
    { $match: { status: { $ne: 'cancelled' } } },
    { $group: { _id: null, total: { $sum: '$totalAmount' } } },
  ]);

  const totalOrders = await Order.countDocuments();
  const totalProducts = await Product.countDocuments();
  const totalCustomers = await User.countDocuments({ role: 'user' });

  const recentOrders = await Order.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .populate('user', 'name email');

  // Sales trend (last 7 days)
  const salesTrend = await Order.aggregate([
    {
      $match: {
        status: { $ne: 'cancelled' },
        createdAt: { $gte: new Date(new Date().setDate(new Date().getDate() - 60)) }
      }
    },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        revenue: { $sum: "$totalAmount" },
        orders: { $sum: 1 }
      }
    },
    { $sort: { "_id": 1 } }
  ]);

  // Category distribution
  const categoryStats = await Order.aggregate([
    { $unwind: "$items" },
    {
      $group: {
        _id: "$items.productModel",
        value: { $sum: { $multiply: ["$items.price", "$items.quantity"] } }
      }
    },
    {
      $project: {
        name: "$_id",
        value: 1,
        _id: 0
      }
    }
  ]);

  // Top products
  const topProducts = await Order.aggregate([
    { $match: { status: { $ne: 'cancelled' } } },
    { $unwind: "$items" },
    {
      $group: {
        _id: "$items.product",
        name: { $first: "$items.productModel" }, // Temporary, will populate later
        sales: { $sum: "$items.quantity" },
        revenue: { $sum: { $multiply: ["$items.price", "$items.quantity"] } }
      }
    },
    { $sort: { revenue: -1 } },
    { $limit: 5 }
  ]);

  // Try to populate names for top products
  const populatedTopProducts = await Promise.all(topProducts.map(async (p) => {
    const Model: any = p.name === 'Honey' ? Honey : Clothing;
    const product = await Model.findById(p._id).select('name');
    return {
      ...p,
      name: product?.name || 'Unknown Product'
    };
  }));

  return {
    revenue: totalRevenue[0]?.total || 0,
    orders: totalOrders,
    products: totalProducts,
    customers: totalCustomers,
    recentOrders,
    salesTrend,
    categoryStats,
    topProducts: populatedTopProducts
  };
};

export const AdminService = {
  getDashboardStats,
};
