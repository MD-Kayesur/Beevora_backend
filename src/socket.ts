import { Server as HttpServer } from 'http';
import { Server } from 'socket.io';
import logger from './config/logger';

let io: Server;

export const initSocket = (server: HttpServer) => {
  io = new Server(server, {
    cors: {
      origin: ['http://localhost:3000', 'http://localhost:3001', 'http://127.0.0.1:3000'],
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    logger.info(`🔌 New socket connection: ${socket.id}`);

    socket.on('disconnect', () => {
      logger.info(`🔌 Socket disconnected: ${socket.id}`);
    });

    // Example event
    socket.on('ping', () => {
      socket.emit('pong', { message: 'Socket is working! 🚀' });
    });
  });

  logger.info('📡 Socket.io initialized successfully');
  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error('Socket.io not initialized!');
  }
  return io;
};
