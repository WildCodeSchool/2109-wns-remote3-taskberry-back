import { PrismaClient, Media } from "@prisma/client";

export interface CreateMediaActionParams {
  prisma: PrismaClient;
  name: string;
  type: string;
  url: string;
  createdAt: Date;
  ticketId: number;
}

const createMediaAction = async ({
  prisma,
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
