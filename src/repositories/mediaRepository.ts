import { PrismaClient } from "@prisma/client";
import { Media } from "../models/Media";

const prisma = new PrismaClient();

const mediaRepository = {
  getTicketMedia: async (ticketId: number): Promise<Media[]> => {
    return prisma.media.findMany({
      where: {
        ticketId: ticketId,
      },
    });
  },

  create: async (mediaInput: any): Promise<Media> => {
    const { name, type, url, ticketId, createdAt } = mediaInput;
    return await prisma.media.create({
      data: {
        name,
        type,
        url,
        createdAt,
        ticketId,
      },
    });
  },

  delete: async (mediaId: number): Promise<Number> => {
    await prisma.media.delete({
      where: {
        id: mediaId,
      },
    });

    return mediaId;
  },
};

export default mediaRepository;
