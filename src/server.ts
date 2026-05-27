import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config/env';
import logger from './config/logger';
import { seedAdmin } from './utils/seedAdmin';
import { seedProducts } from './utils/seedProducts';
import { seedCoupons } from './utils/seedCoupons';
import { initSocket } from './socket';

let server: Server;

async function main() {
  try {
    // Seed initial data
    await seedAdmin();
    await seedProducts();
    await seedCoupons();

    server = app.listen(config.port, () => {
      logger.info(`🚀 Server running on port ${config.port}`);
    });

    // Initialize Socket.io
    initSocket(server);
  } catch (error) {
    logger.error('❌ Failed to connect to database', error);
  }

  process.on('unhandledRejection', (error) => {
    if (server) {
      server.close(() => {
        logger.error('Unhandled Rejection, closing server...', error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

main();

process.on('SIGTERM', () => {
  logger.info('SIGTERM received, closing server...');
  if (server) {
    server.close();
  }
});
