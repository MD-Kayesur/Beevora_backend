"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const env_1 = __importDefault(require("./config/env"));
const logger_1 = __importDefault(require("./config/logger"));
const seedAdmin_1 = require("./utils/seedAdmin");
const seedProducts_1 = require("./utils/seedProducts");
const seedCoupons_1 = require("./utils/seedCoupons");
let server;
async function main() {
    try {
        await mongoose_1.default.connect(env_1.default.database_url);
        logger_1.default.info('📦 Database connection successful');
        // Seed initial data
        await (0, seedAdmin_1.seedAdmin)();
        await (0, seedProducts_1.seedProducts)();
        await (0, seedCoupons_1.seedCoupons)();
        server = app_1.default.listen(env_1.default.port, () => {
            logger_1.default.info(`🚀 Server running on port ${env_1.default.port}`);
        });
    }
    catch (error) {
        logger_1.default.error('❌ Failed to connect to database', error);
    }
    process.on('unhandledRejection', (error) => {
        if (server) {
            server.close(() => {
                logger_1.default.error('Unhandled Rejection, closing server...', error);
                process.exit(1);
            });
        }
        else {
            process.exit(1);
        }
    });
}
main();
process.on('SIGTERM', () => {
    logger_1.default.info('SIGTERM received, closing server...');
    if (server) {
        server.close();
    }
});
