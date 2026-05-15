"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const order_service_1 = require("./order.service");
const stripe_service_1 = require("./stripe.service");
const fs_1 = __importDefault(require("fs"));
const ApiError_1 = __importDefault(require("../../utils/ApiError"));
const downloadInvoice = (0, catchAsync_1.default)(async (req, res) => {
    const orderId = req.params.id;
    const order = await order_service_1.OrderService.getOrderById(orderId);
    if (!order) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Order not found');
    }
    // Ownership check
    const userId = order.user._id?.toString() || order.user.toString();
    if (req.user.role !== 'admin' && userId !== req.user.id) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'You do not have permission to download this invoice');
    }
    if (!order.invoicePath || !fs_1.default.existsSync(order.invoicePath)) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Invoice not generated yet');
    }
    const fileName = `invoice_${order._id || orderId}.pdf`;
    res.download(order.invoicePath, fileName);
});
const createOrder = (0, catchAsync_1.default)(async (req, res) => {
    const result = await order_service_1.OrderService.createOrder({
        ...req.body,
        user: req.user.id,
    });
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: 'Order placed successfully!',
        data: result,
    });
});
const getMyOrders = (0, catchAsync_1.default)(async (req, res) => {
    const result = await order_service_1.OrderService.getMyOrders(req.user.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Orders fetched successfully!',
        data: result,
    });
});
const getAllOrders = (0, catchAsync_1.default)(async (req, res) => {
    const result = await order_service_1.OrderService.getAllOrders();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'All orders fetched successfully!',
        data: result,
    });
});
const updateOrderStatus = (0, catchAsync_1.default)(async (req, res) => {
    const result = await order_service_1.OrderService.updateOrderStatus(req.params.id, req.body.status);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Order status updated successfully!',
        data: result,
    });
});
const deleteOrder = (0, catchAsync_1.default)(async (req, res) => {
    const result = await order_service_1.OrderService.deleteOrder(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Order deleted successfully!',
        data: result,
    });
});
const createPaymentIntentController = (0, catchAsync_1.default)(async (req, res) => {
    const { amount } = req.body;
    const paymentIntent = await (0, stripe_service_1.createPaymentIntent)(amount);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Payment intent created successfully!',
        data: {
            clientSecret: paymentIntent.client_secret,
        },
    });
});
exports.OrderController = {
    createOrder,
    getMyOrders,
    getAllOrders,
    updateOrderStatus,
    deleteOrder,
    downloadInvoice,
    createPaymentIntent: createPaymentIntentController,
};
