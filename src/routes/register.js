import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';
import { socketManager, connectedUsers } from '../utils/socket-manager.js';

const register = async (socket, userData) => {
  const { email, password } = userData;

  if (!email) {
    throw new Error('[register] - email must be provided');
  }

  if (!password) {
    throw new Error('[register] - password must be provided');
  }

  // check if user already exist in the db if so throw error
  const existingUser = await User.findOne({ where: { email } });

  if (existingUser) {
    throw new Error('[register] - invalid credentials');
  }

  try {
    // create new user in the db
    const user = await User.create({ email, password });
    // create jwt
    const userJWT = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY
    );

    // add user to the connected users socket map
    connectedUsers.set([user.id], socket.id);

    // send the client the jwt back
    socketManager.to(socket.id).emit('authenticated', userJWT);
  }
  catch (err) {
    throw new Error('[register] - error creating user', err);
  }
};

export { register as registerRoute };