import { PrismaClient, User } from "@prisma/client";
import {
  CommentInput,
  PartialUpdateCommentInput,
} from "../inputs/CommentInput";
import { Comment } from "../models/Comment";

const prisma = new PrismaClient();

const commentRepository = {
  getTicketComments: async (
    ticketId: number
  ): Promise<(Comment & { User: User })[]> => {
    return prisma.comment.findMany({
      where: {
        ticketId: ticketId,
      },
      include: {
        User: true,
      },
    });
  },

  create: async (
    commentInput: CommentInput
  ): Promise<Comment & { User: User }> => {
    const { description, userId, ticketId, createdAt } = commentInput;
    return await prisma.comment.create({
      data: {
        description,
        userId,
        ticketId,
        createdAt,
      },
      include: {
        User: true,
      },
    });
  },

  update: async (
    partialInput: PartialUpdateCommentInput
  ): Promise<Comment & { User: User }> => {
    const { id, description } = partialInput;

    return await prisma.comment.update({
      where: {
        id: id,
      },
      data: {
        description: description.trim(),
      },
      include: {
        User: true,
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
