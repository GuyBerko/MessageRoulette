import { connectedUsers, socketManager } from '../utils/socket-manager.js';

const wild = (socket, usersToEmit) => {
  if (connectedUsers.size === 0) {
    throw new Error('[wild] - No connected users');
  }

  // if there is less or equal number of connected users as usersToEmit broadcast to all
  if (connectedUsers.size <= usersToEmit) {
    socket.broadcast.emit('wild');
    return;
  }

  // generate random number between 0 to connected users length minus usersToEmit
  const randomStart = Math.floor(Math.random() * (connectedUsers.size - usersToEmit));

  // get random user from connected users set
  const randomUsers = Array.from(connectedUsers).slice(randomStart, randomStart + usersToEmit);

  for (const user of randomUsers) {
    // get the random user socket id
    const userSocketId = user[1];

    // emit spin message to random user
    socketManager.to(userSocketId).emit('wild');
  }
};

export { wild as wildRoute };