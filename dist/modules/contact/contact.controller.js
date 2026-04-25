"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const contact_service_1 = require("./contact.service");
const submitContactForm = (0, catchAsync_1.default)(async (req, res) => {
    const result = await contact_service_1.ContactService.sendContactEmail(req.body);
    if (!result.success) {
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.INTERNAL_SERVER_ERROR,
            success: false,
            message: result.message || 'Failed to send message',
        });
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Message sent successfully!',
        data: result.result,
    });
});
exports.ContactController = {
    submitContactForm,
};
