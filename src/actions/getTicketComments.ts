import { Comment, PrismaClient } from "@prisma/client";

export interface GetTicketCommentsActionParams {
  prisma: PrismaClient;
  id: number;
}

const getTicketCommentsAction = async ({
  prisma,
  id,
}: GetTicketCommentsActionParams): Promise<Comment[]> => {
  return await prisma.comment.findMany({
    where: { ticketId: id },
  });
};

export default getTicketCommentsAction;
