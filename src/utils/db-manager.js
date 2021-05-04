import Sequelize from 'sequelize';
import redis from 'socket.io-redis';
import { config as mysqlConfig } from '../config/mysql.config.js';
import { config as redisConfig } from '../config/redis.config.js';

// mysql sequelize instance
const sequelize = new Sequelize(mysqlConfig.database, mysqlConfig.user, mysqlConfig.password, {
  host: mysqlConfig.host,
  dialect: mysqlConfig.dialect
});

// socket io redis instance for socket pub/sub
const socketIoRedis = redis({ host: redisConfig.host, port: redisConfig.port });

export { Sequelize, sequelize, socketIoRedis };