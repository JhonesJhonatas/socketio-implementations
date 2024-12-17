import { Request, Response } from "express";

import { ListMessagesService } from "../../services/message/list-messages-service";

export class ListMessagesController {
  async handle(request: Request, response: Response) {
    const listMessagesService = new ListMessagesService();

    const messages = await listMessagesService.execute();

    return response.status(200).json(messages);
  }
}
