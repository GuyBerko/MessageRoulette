import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';

import { setupSocket } from './utils/socket-manager.js';
import { sequelize } from './utils/db-manager.js';

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();
const server = http.Server(app);

app.use(cors());

sequelize.sync();

setupSocket(server);

server.listen(PORT, () => {
  console.log(`Listen on port ${PORT}`);
});
