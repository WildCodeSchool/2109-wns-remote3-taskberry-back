import { Comment, PrismaClient, User } from "@prisma/client";
import { UserInputError } from "apollo-server";
import isUserAdminOfProject from "../helpers/isUserAdminOfProject";
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
  ): Promise<(Comment & { User: User })[]> => {
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

  create: async (
    commentInput: CommentInput,
    userId: number
  ): Promise<Comment & { User: User }> => {
    const { description, ticketId, createdAt } = commentInput;
    const commentUserId = commentInput.userId;

    const ticket = await prisma.ticket.findUnique({
      where: { id: ticketId },
    });

    if (!description) {
      throw new Error("Comment description is required");
    }

    if (!ticketId) {
      throw new Error("Ticket ID is required");
    }

    if (!commentUserId) {
      throw new Error("User ID is required");
    }

    if (!createdAt) {
      throw new Error("Create date is required");
    }

    if (!(await isUserMemberOfProject(ticket?.projectId, userId))) {
      throw new Error("User is not a member of the project");
    }

    return commentRepository.create(commentInput);
  },

  update: async (
    partialInput: PartialUpdateCommentInput,
    userId: number
  ): Promise<Comment> => {
    const { id, description } = partialInput;

    const isCommentExists = await prisma.comment.findUnique({
      where: { id: id },
    });

    const ticket = await prisma.ticket.findUnique({
      where: { id: isCommentExists?.ticketId },
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

    if (!(await isUserMemberOfProject(ticket?.projectId, userId))) {
      throw new Error("User is not a member of the project");
    }

    if (userId !== isCommentExists.userId) {
      throw new Error("User is not the owner of the resource");
    }

    return commentRepository.update(partialInput);
  },

  delete: async (commentId: number, userId: number): Promise<Number> => {
    const isCommentExists = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    const ticket = await prisma.ticket.findUnique({
      where: { id: isCommentExists?.ticketId },
    });

    if (!commentId) {
      throw new Error("Comment ID is required");
    }

    if (typeof commentId !== "number") {
      throw new Error("Comment ID must be a number");
    }

    if (!isCommentExists) {
      throw new Error("Comment doesn't exist");
    }

    if (!(await isUserAdminOfProject(ticket?.projectId, userId))) {
      throw new Error("User is not the project Administrator");
    }

    return commentRepository.delete(commentId);
  },
};

export default commentService;
