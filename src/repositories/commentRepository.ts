import { PrismaClient } from "@prisma/client";
import {
  CommentInput,
  PartialUpdateCommentInput,
} from "../inputs/CommentInput";
import { Comment } from "../models/Comment";

const prisma = new PrismaClient();

const commentRepository = {
  getTicketComments: async (
    ticketId: number
  ): Promise<
    | Comment[]
    | (Comment | (Comment & { [x: string]: never }))[]
    | "Please either choose `select` or `include`"
  > => {
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
  ): Promise<
    | "Please either choose `select` or `include`"
    | Comment
    | (Comment & { [x: string]: never })
  > => {
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
