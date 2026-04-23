import { Types } from 'mongoose';

export interface ICartItem {
  product: Types.ObjectId;
  productModel: 'Honey' | 'Clothing';
  quantity: number;
}

export interface ICart {
  user: Types.ObjectId;
  items: ICartItem[];
  subtotal: number;
  discount: number;
  total: number;
  coupon?: string;
}
