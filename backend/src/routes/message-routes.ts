import { Router } from "express";

import { ListMessagesController, SendMessageController } from "../controllers/message";

const sendMessageController = new SendMessageController();
const listMessagesController = new ListMessagesController();

export const messageRoutes = Router();

messageRoutes.get('/', (request, response) => {
  listMessagesController.handle(request, response);
});
messageRoutes.post('/', (request, response) => {
  sendMessageController.handle(request, response);
});
