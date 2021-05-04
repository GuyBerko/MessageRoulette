import { Server as SocketServer } from 'socket.io';
import { setupRoutes } from './routes-manager.js';
import { socketIoRedis } from './db-manager.js';

let io = null; // the io instace
const connectedUsers = new Map(); // map that will contained all of the connected clients

const setupSocket = (server) => {
  io = new SocketServer(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });

  // set redis pub/sub adapter
  io.adapter(socketIoRedis);

  io.on('connection', (socket) => {
    // init routes
    setupRoutes(socket);

    socket.on('disconnect', () => {
      // on disconnect loop over the connectedUsers and remove the user that disconnect
      for (const user of Array.from(connectedUsers)) {
        const userSocketId = user[1];
        if (userSocketId === socket.id) {
          const userId = user[0];
          connectedUsers.delete(userId);
          break;
        }
      }
    });
  });
};

export {
  setupSocket,
  connectedUsers,
  io as socketManager
};