import { PrismaClient } from "@prisma/client";
import {
  CommentInput,
  PartialUpdateCommentInput,
} from "../inputs/CommentInput";
import { Comment } from "../models/Comment";

const prisma = new PrismaClient();

const commentRepository = {
  getTicketComments: async (ticketId: number): Promise<Comment[]> => {
    return prisma.comment.findMany({
      where: { ticketId: ticketId },
    });
  },

  create: async (commentInput: CommentInput): Promise<Comment> => {
    const { description, userId, ticketId, createdAt } = commentInput;
    return await prisma.comment.create({
      data: {
        description,
        userId,
        ticketId,
        createdAt,
      },
    });
  },

  update: async (partialInput: PartialUpdateCommentInput): Promise<Comment> => {
    const { id, description } = partialInput;

    return await prisma.comment.update({
      where: {
        id: id,
      },
      data: {
        description: description.toLocaleLowerCase().trim(),
      },
    });
  },

  delete: async (commentId: number): Promise<Number> => {
    await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });

    return commentId;
  },
};

export default commentRepository;
