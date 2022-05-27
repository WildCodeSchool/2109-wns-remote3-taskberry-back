import { PrismaClient, Comment } from "@prisma/client";

const prisma = new PrismaClient();

export interface CreateCommentActionParams {
  description: string;
  createdAt: Date;
  userId: number;
  ticketId: number;
}

const createCommentAction = async ({
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
