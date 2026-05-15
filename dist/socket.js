"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIO = exports.initSocket = void 0;
const socket_io_1 = require("socket.io");
const logger_1 = __importDefault(require("./config/logger"));
let io;
const initSocket = (server) => {
    io = new socket_io_1.Server(server, {
        cors: {
            origin: ['http://localhost:3000', 'http://localhost:3001', 'http://127.0.0.1:3000'],
            methods: ['GET', 'POST'],
            credentials: true,
        },
    });
    io.on('connection', (socket) => {
        logger_1.default.info(`🔌 New socket connection: ${socket.id}`);
        socket.on('disconnect', () => {
            logger_1.default.info(`🔌 Socket disconnected: ${socket.id}`);
        });
        // Example event
        socket.on('ping', () => {
            socket.emit('pong', { message: 'Socket is working! 🚀' });
        });
        // Chat events
        socket.on('chat-message', (data) => {
            logger_1.default.info(`💬 Message from ${socket.id}: ${data.text}`);
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
    logger_1.default.info('📡 Socket.io initialized successfully');
    return io;
};
exports.initSocket = initSocket;
const getIO = () => {
    if (!io) {
        throw new Error('Socket.io not initialized!');
    }
    return io;
};
exports.getIO = getIO;
