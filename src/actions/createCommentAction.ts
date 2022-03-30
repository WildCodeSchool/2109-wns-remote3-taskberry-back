import { PrismaClient, Comment } from "@prisma/client";

export interface CreateCommentActionParams {
  prisma: PrismaClient;
  description: string;
  createdAt: Date;
  userId: number;
  ticketId: number;
}

const createCommentAction = async ({
  prisma,
  description,
  createdAt,
  userId,
  ticketId,
}: CreateCommentActionParams): Promise<Comment> => {
  return await prisma.comment.create({
    data: { description, createdAt, userId, ticketId },
  });
};
export default createCommentAction;
