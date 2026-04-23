import { Schema, model } from 'mongoose';
import { ICart } from './cart.interface';

const cartItemSchema = new Schema({
  product: { 
    type: Schema.Types.ObjectId, 
    required: true, 
    refPath: 'items.productModel' 
  },
  productModel: {
    type: String,
    required: true,
    enum: ['Honey', 'Clothing']
  },
  quantity: { type: Number, required: true, min: 1 },
});

const cartSchema = new Schema<ICart>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    items: [cartItemSchema],
    subtotal: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
    coupon: { type: String },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete (ret as any).__v;
        return ret;
      },
    },
    toObject: {
      virtuals: true,
    },
  }
);

export const Cart = model<ICart>('Cart', cartSchema);
