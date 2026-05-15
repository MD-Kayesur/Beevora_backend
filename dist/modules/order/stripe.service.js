"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyWebhookSignature = exports.createPaymentIntent = void 0;
const stripe_1 = __importDefault(require("stripe"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
    apiVersion: '2025-01-27.acacia',
});
const createPaymentIntent = async (amount, currency = 'usd') => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Stripe expects amount in cents
            currency,
            metadata: {
                integration_check: 'accept_a_payment',
            },
        });
        return paymentIntent;
    }
    catch (error) {
        throw new Error(`Stripe Error: ${error.message}`);
    }
};
exports.createPaymentIntent = createPaymentIntent;
const verifyWebhookSignature = (payload, signature, secret) => {
    return stripe.webhooks.constructEvent(payload, signature, secret);
};
exports.verifyWebhookSignature = verifyWebhookSignature;
exports.default = stripe;
