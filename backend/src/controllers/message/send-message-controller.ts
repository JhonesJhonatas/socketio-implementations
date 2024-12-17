import { Request, Response } from "express";

import { SendMessageService } from "../../services/message/send-message-service";

export class SendMessageController {
  async handle(request: Request, response: Response) {
    const { message, author } = request.body;

    const sendMessageService = new SendMessageService();

    const createdMessage = await sendMessageService.execute({ message, author });

    return response.status(201).json(createdMessage);
  }
}
