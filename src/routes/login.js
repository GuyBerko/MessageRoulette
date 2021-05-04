import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';
import { socketManager, connectedUsers } from '../utils/socket-manager.js';
import { PasswordManager } from '../utils/password-manager.js';

const login = async (socket, userData) => {
  const { email, password } = userData;

  if (!email) {
    throw new Error('[login] - email must be provided');
  }

  if (!password) {
    throw new Error('[login] - password must be provided');
  }

  // check if user exist if not throw error
  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new Error('[login] - invalid credentials');
  }

  // check if the password that we got from the request equal to the one stored in the db if not throw error
  const isPasswordValid = await PasswordManager.compare(
    user.password,
    password
  );

  if (!isPasswordValid) {
    throw new Error('[login] - invalid credentials');
  }

  // generate new jwt
  const userJWT = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_KEY
  );

  // add user to the connected users socket map
  connectedUsers.set(user.id, socket.id);

  // send the client the jwt back
  socketManager.to(socket.id).emit('authenticated', userJWT);
};

export { login as loginRoute };