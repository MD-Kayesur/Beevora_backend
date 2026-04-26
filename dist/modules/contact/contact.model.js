"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contact = void 0;
const mongoose_1 = require("mongoose");
const contactSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: String },
}, {
    timestamps: true,
});
exports.Contact = (0, mongoose_1.model)('Contact', contactSchema);
