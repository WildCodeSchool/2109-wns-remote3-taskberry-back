import { Comment, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface GetTicketCommentsActionParams {
  prisma: PrismaClient;
  id: number;
}

const getTicketCommentsAction = async ({
  id,
}: {
  id: number;
}): Promise<Comment[]> => {
  return await prisma.comment.findMany({
    where: { ticketId: id },
  });
};

export default getTicketCommentsAction;
