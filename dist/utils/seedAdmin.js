"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedAdmin = void 0;
const user_model_1 = require("../modules/user/user.model");
const logger_1 = __importDefault(require("../config/logger"));
const seedAdmin = async () => {
    const adminEmail = 'rmdkayesur@gmail.com';
    const adminPassword = 'admin@123'; // Default password for the requested admin
    try {
        const existingAdmin = await user_model_1.User.findOne({ email: adminEmail });
        if (existingAdmin) {
            if (existingAdmin.role !== 'admin') {
                existingAdmin.role = 'admin';
                await existingAdmin.save();
                logger_1.default.info('👤 Admin user role updated to admin');
            }
            else {
                logger_1.default.info('👤 Admin user already exists');
            }
            return;
        }
        const adminUser = {
            name: 'System Admin',
            email: adminEmail,
            password: adminPassword,
            role: 'admin',
        };
        await user_model_1.User.create(adminUser);
        logger_1.default.info('✅ Admin user seeded successfully');
        logger_1.default.info(`📧 Credentials: ${adminEmail} / ${adminPassword}`);
    }
    catch (error) {
        logger_1.default.error('❌ Error seeding admin user:', error);
    }
};
exports.seedAdmin = seedAdmin;
