import { PrismaClient, Media } from "@prisma/client";

const prisma = new PrismaClient();

export interface CreateMediaActionParams {
  name: string;
  type: string;
  url: string;
  createdAt: Date;
  ticketId: number;
}

const createMediaAction = async ({
  name,
  type,
  url,
  createdAt,
  ticketId,
}: CreateMediaActionParams): Promise<Media> => {
  return await prisma.media.create({
    data: { name, type, url, createdAt, ticketId },
  });
};
export default createMediaAction;
