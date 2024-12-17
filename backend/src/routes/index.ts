import { Router } from "express";

import { messageRoutes } from "./message-routes";

export const routes = Router();

routes.use('/messages', messageRoutes);
