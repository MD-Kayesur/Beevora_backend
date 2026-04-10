"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_middleware_1 = __importDefault(require("./auth.middleware"));
const adminMiddleware = (0, auth_middleware_1.default)('admin');
exports.default = adminMiddleware;
