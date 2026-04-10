import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config/env';
import logger from './config/logger';
import { seedAdmin } from './utils/seedAdmin';

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info('📦 Database connection successful');

    // Seed admin user
    await seedAdmin();

    server = app.listen(config.port, () => {
      logger.info(`🚀 Server running on port ${config.port}`);
    });
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
