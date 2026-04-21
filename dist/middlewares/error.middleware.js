"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = __importDefault(require("../config/env"));
const logger_1 = __importDefault(require("../config/logger"));
const zod_1 = require("zod");
const globalErrorHandler = (error, req, res, next) => {
    // Log error for debugging
    logger_1.default.error('Error in API:', error);
    let statusCode = error.statusCode || 500;
    let message = 'Something went wrong!';
    let errorMessages = [];
    if (error instanceof zod_1.ZodError) {
        statusCode = 400;
        message = 'Validation Error';
        errorMessages = error.issues.map((issue) => {
            return {
                path: issue?.path[issue.path.length - 1],
                message: issue?.message,
            };
        });
    }
    else if (error instanceof Error) {
        message = error?.message;
        errorMessages = error?.message
            ? [
                {
                    path: '',
                    message: error?.message,
                },
            ]
            : [];
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            statusCode = 401;
            message = 'Unauthorized: Invalid or expired token';
        }
        else if (error.code === 11000) {
            statusCode = 409;
            message = 'Duplicate field error: A resource with this value already exists';
        }
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorMessages,
        stack: env_1.default.env !== 'production' ? error?.stack : undefined,
    });
};
exports.default = globalErrorHandler;
