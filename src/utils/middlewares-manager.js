import jwt from 'jsonwebtoken';

/**
 * Authentication middleware verfiy that the request have a valid jwt token else throw error. 
 * @param {*} socket - the socket instance
 * @param {*} routeCallback - the current route callback function
 * @param {*} data - the data that was sent from the client
 */
const authMiddleware = (socket, routeCallback, data) => {
  if (socket.handshake.auth?.token) {
    const payload = jwt.verify(socket.handshake.auth.token, process.env.JWT_KEY);

    if (!payload) {
      throw new Error('[socket][auth-middleware] - Authentication error');
    }

    routeCallback(socket, data);
  }
  else {
    throw new Error('[socket][auth-middleware] - Authentication error');
  }
};

export { authMiddleware };