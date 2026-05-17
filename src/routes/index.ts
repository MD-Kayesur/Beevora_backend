import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { ProductRoutes } from '../modules/product/product.route';
import { UserRoutes } from '../modules/user/user.route';
import { OrderRoutes } from '../modules/order/order.route';
import { AdminRoutes } from '../modules/admin/admin.route';

import { CouponRoutes } from '../modules/coupon/coupon.route';

import { CartRoutes } from '../modules/cart/cart.route';
import { HoneyRoutes } from '../modules/honey/honey.route';
import { ClothingRoutes } from '../modules/clothing/clothing.route';
import { ContactRoutes } from '../modules/contact/contact.route';
import { ReviewRoutes } from '../modules/review/review.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/products',
    route: ProductRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/orders',
    route: OrderRoutes,
  },
  {
    path: '/coupons',
    route: CouponRoutes,
  },
  {
    path: '/admin',
    route: AdminRoutes,
  },
  {
    path: '/cart',
    route: CartRoutes,
  },
  {
    path: '/honey',
    route: HoneyRoutes,
  },
  {
    path: '/clothing',
    route: ClothingRoutes,
  },
  {
    path: '/contact',
    route: ContactRoutes,
  },
  {
    path: '/reviews',
    route: ReviewRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
