import { Server } from "http";
import { Server as SocketIOServer } from "socket.io";

let io: SocketIOServer;

export const initSocketIo = (server: Server): SocketIOServer => {
  io = new SocketIOServer(server, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', (socket) => {
    console.log('a user connected');
  });

  return io;
};

export const getIo = () => {
  if (!io) {
    throw new Error('Socket.io not initialized');
  }

  return io;
};
