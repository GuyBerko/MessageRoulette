import { registerRoute } from '../routes/register.js';
import { loginRoute } from '../routes/login.js';
import { spinRoute } from '../routes/spin.js';
import { wildRoute } from '../routes/wild.js';
import { blastRoute } from '../routes/blast.js';
import { authMiddleware } from './middlewares-manager.js';

export const setupRoutes = (socket) => {
  socket.on('register', registerRoute.bind(this, socket));
  socket.on('login', loginRoute.bind(this, socket));
  socket.on('spin', authMiddleware.bind(this, socket, spinRoute));
  socket.on('wild', authMiddleware.bind(this, socket, wildRoute));
  socket.on('blast', authMiddleware.bind(this, socket, blastRoute));
};
