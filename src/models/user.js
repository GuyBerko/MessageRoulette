import Sequelize from 'sequelize';
import { sequelize } from '../utils/db-manager.js';
import { PasswordManager } from '../utils/password-manager.js';

const User = sequelize.define('User', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: "Must be a valid email address",
      }
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  hooks: {
    beforeCreate: async (user) => {
      const hashed = await PasswordManager.toHash(user.password);
      user.password = hashed;
    }
  }
});

export { User };