import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  apiVersion: '2025-01-27.acacia' as any,
});

export const createPaymentIntent = async (amount: number, currency: string = 'usd') => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe expects amount in cents
      currency,
      metadata: {
        integration_check: 'accept_a_payment',
      },
    });
    return paymentIntent;
  } catch (error: any) {
    throw new Error(`Stripe Error: ${error.message}`);
  }
};

export const verifyWebhookSignature = (payload: string | Buffer, signature: string, secret: string) => {
  return stripe.webhooks.constructEvent(payload, signature, secret);
};

export default stripe;
