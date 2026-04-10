export interface ICoupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  expiryDate: Date;
  isActive: boolean;
  usageLimit: number;
  usageCount: number;
}
