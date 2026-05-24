import { Server as HttpServer } from 'http';
import { Server } from 'socket.io';
import logger from './config/logger';

let io: Server;

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://127.0.0.1:3000',
  'https://beevora-frontend.vercel.app'
];

export const initSocket = (server: HttpServer) => {
  io = new Server(server, {
    cors: {
      origin: (requestOrigin, callback) => {
        // Allow requests with no origin (like mobile apps, curl, etc.)
        if (!requestOrigin) return callback(null, true);
        if (allowedOrigins.indexOf(requestOrigin) !== -1 || requestOrigin.endsWith('.vercel.app')) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
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

    // Chat events
    socket.on('chat-message', (data) => {
      logger.info(`💬 Message from ${socket.id}: ${data.text}`);
      
      // Broadcast the user's message to everyone else (or everyone if we want global chat)
      const broadcastData = {
        ...data,
        senderId: socket.id,
        timestamp: new Date().toISOString(),
      };
      
      // Emit to everyone so all users see it
      io.emit('chat-message', broadcastData);

      // Optional: Add bot response for everyone to see
      if (data.text.toLowerCase().includes('help')) {
        setTimeout(() => {
          const response = {
            text: `Beevora Assistant: One of our team members will be with you shortly. Currently, ${io.engine.clientsCount} users are online!`,
            sender: 'bot',
            timestamp: new Date().toISOString(),
          };
          io.emit('chat-message', response);
        }, 2000);
      }
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
