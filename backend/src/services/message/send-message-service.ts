import { PrismaClient } from "@prisma/client";
import { getIo } from "../../socket/sockets";

type IRequest = {
  message: string;
  author: string;
}

export class SendMessageService {
  private prismaClient = new PrismaClient();
  private io = getIo();

  async execute({ message, author }: IRequest) {
    const createdMessage = await this.prismaClient.message.create({
      data: { content: message, author },
    });

    this.io.emit('message', createdMessage);

    return createdMessage;
  }
}
