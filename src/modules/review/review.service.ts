import { Types } from 'mongoose';
import { Review } from './review.model';
import { Honey } from '../honey/honey.model';
import { Clothing } from '../clothing/clothing.model';
import { Product } from '../product/product.model';
import { Order } from '../order/order.model';
import { IReview } from './review.interface';

const createReview = async (
  userId: string,
  productId: string,
  payload: { rating: number; comment: string; images?: string[] }
): Promise<IReview> => {
  // 1. Identify which collection this product belongs to
  let productModel: 'Honey' | 'Clothing' | 'Product' | null = null;
  
  let product: any = await Honey.findById(productId);
  if (product) {
    productModel = 'Honey';
  } else {
    product = await Clothing.findById(productId);
    if (product) {
      productModel = 'Clothing';
    } else {
      product = await Product.findById(productId);
      if (product) {
        productModel = 'Product';
      }
    }
  }

  if (!product || !productModel) {
    throw new Error('Product not found');
  }

  // 2. Check if the user has already reviewed this product
  const existingReview = await Review.findOne({ user: userId, product: productId });
  if (existingReview) {
    throw new Error('You have already reviewed this product');
  }

  // 3. Verify if user bought the product (Verified Purchase)
  // Check for any delivered order by this user containing this product
  const orders = await Order.find({
    user: userId,
    status: 'delivered',
    'items.product': productId,
  });
  const isVerified = orders.length > 0;

  // 4. Create the review
  const review = await Review.create({
    user: userId,
    product: productId,
    productModel,
    rating: payload.rating,
    comment: payload.comment,
    images: payload.images || [],
    isVerified,
  });

  // 5. Aggregate and recalculate the average rating and reviewCount for this product
  const stats = await Review.aggregate([
    { $match: { product: new Types.ObjectId(productId) } },
    {
      $group: {
        _id: '$product',
        avgRating: { $avg: '$rating' },
        count: { $sum: 1 },
      },
    },
  ]);

  if (stats.length > 0) {
    const avgRating = Number(stats[0].avgRating.toFixed(1));
    const count = stats[0].count;

    const Model: any = productModel === 'Honey' ? Honey : productModel === 'Clothing' ? Clothing : Product;
    await Model.findByIdAndUpdate(productId, {
      rating: avgRating,
      reviewCount: count,
    });
  }

  return review;
};

const getProductReviews = async (productId: string) => {
  const reviews = await Review.find({ product: productId })
    .populate('user', 'name email')
    .sort({ createdAt: -1 });
  return reviews;
};

export const ReviewService = {
  createReview,
  getProductReviews,
};
