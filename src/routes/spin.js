import { connectedUsers, socketManager } from '../utils/socket-manager.js';

const spin = () => {
  if (connectedUsers.size === 0) {
    throw new Error('[spin] - No connected users');
  }

  // generate random number between 0 to connected users length
  const random = Math.floor(Math.random() * connectedUsers.size);

  // get random user from connected users set
  const randomUser = Array.from(connectedUsers)[random];

  // get the random user socket id
  const userSocketId = randomUser[1];

  // emit spin message to random user
  socketManager.to(userSocketId).emit('spin');
};

export { spin as spinRoute };