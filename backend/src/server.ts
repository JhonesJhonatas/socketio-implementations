import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors'

import { routes } from './routes';
import { initSocketIo } from './socket/sockets';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: '*',
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(routes);

const server = app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

initSocketIo(server);
