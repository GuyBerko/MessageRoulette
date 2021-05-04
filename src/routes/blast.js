import { connectedUsers } from '../utils/socket-manager.js';

const blast = (socket) => {
  if (connectedUsers.size === 0) {
    throw new Error('[blast] - No connected users');
  }

  socket.broadcast.emit('blast');
};

export { blast as blastRoute };