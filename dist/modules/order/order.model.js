"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
        {
            product: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
        },
    ],
    totalAmount: { type: Number, required: true },
    shippingAddress: { type: String, required: true },
    status: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
        default: 'pending',
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'failed'],
        default: 'pending',
    },
    transactionId: { type: String },
}, {
    timestamps: true,
});
exports.Order = (0, mongoose_1.model)('Order', orderSchema);
