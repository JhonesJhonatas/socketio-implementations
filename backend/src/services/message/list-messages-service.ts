import { PrismaClient } from "@prisma/client";

export class ListMessagesService {
  private prismaClient = new PrismaClient();

  async execute() {
    const messages = await this.prismaClient.message.findMany();
    return messages;
  }
}
