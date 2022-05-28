import { Comment, PrismaClient } from "@prisma/client";
import { UserInputError } from "apollo-server";
import isUserMemberOfProject from "../helpers/isUserMemberOfProject";
import {
  CommentInput,
  PartialUpdateCommentInput,
} from "../inputs/CommentInput";
import commentRepository from "../repositories/commentRepository";

const prisma = new PrismaClient();

const commentService = {
  getTicketComments: async (
    ticketId: number,
    userId: number
  ): Promise<
    | Comment[]
    | (Comment | (Comment & { [x: string]: never }))[]
    | "Please either choose `select` or `include`"
  > => {
    const ticket = await prisma.ticket.findUnique({
      where: { id: ticketId },
    });

    if (!ticket) {
      throw new Error("Ticket doesn't exist");
    }

    if (!ticketId) {
      throw new Error("Ticket ID is required");
    }

    if (ticketId < 1) {
      throw new UserInputError("Invalid argument value", {
        argumentName: "id",
      });
    }

    if (!(await isUserMemberOfProject(ticket?.projectId, userId))) {
      throw new Error("User is not a member of the project");
    }

    return commentRepository.getTicketComments(ticketId);
  },

  create: (
    commentInput: CommentInput
  ): Promise<
    | "Please either choose `select` or `include`"
    | Comment
    | (Comment & { [x: string]: never })
  > => {
    const { description, ticketId, userId, createdAt } = commentInput;

    if (!description) {
      throw new Error("Comment description is required");
    }

    if (!ticketId) {
      throw new Error("Ticket ID is required");
    }

    if (!userId) {
      throw new Error("User ID is required");
    }

    if (!createdAt) {
      throw new Error("Create date is required");
    }

    return commentRepository.create(commentInput);
  },

  update: async (partialInput: PartialUpdateCommentInput): Promise<Comment> => {
    const { id, description } = partialInput;

    const isCommentExists = await prisma.comment.findUnique({
      where: { id: id },
    });

    if (!id) {
      throw new Error("Comment ID is required");
    }

    if (!isCommentExists) {
      throw new Error("Comment doesn't exist");
    }

    if (!description) {
      throw new Error("Comment description is required");
    }

    return commentRepository.update(partialInput);
  },

  delete: (commentId: number): Promise<Number> => {
    if (!commentId) {
      throw new Error("Comment ID is required");
    }

    if (typeof commentId !== "number") {
      throw new Error("Comment ID must be a number");
    }

    return commentRepository.delete(commentId);
  },
};

export default commentService;
