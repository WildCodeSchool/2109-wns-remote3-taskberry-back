import { PrismaClient } from "@prisma/client";
import { UserInputError } from "apollo-server";
import isUserMemberOfProject from "../helpers/isUserMemberOfProject";
import { MediaInput } from "../inputs/MediaInput";
import { Media } from "../models/Media";
import mediaRepository from "../repositories/mediaRepository";

const prisma = new PrismaClient();

const mediaService = {
  getTicketMedia: async (
    ticketId: number,
    userId: number
  ): Promise<Media[]> => {
    const ticket = await prisma.ticket.findUnique({
      where: { id: ticketId },
    });

    if (!ticket) {
      throw new Error("Ticket doesn't exist");
    }

    if (!ticketId) {
      throw new Error("Ticket ID is required");
    }

    if (!userId) {
      throw new Error("User ID is required");
    }

    if (ticketId < 1) {
      throw new UserInputError("Invalid argument value", {
        argumentName: "id",
      });
    }

    if (!(await isUserMemberOfProject(ticket?.projectId, userId))) {
      throw new Error("User is not a member of the project");
    }

    return mediaRepository.getTicketMedia(ticketId);
  },

  create: async (mediaInput: MediaInput, userId: number): Promise<Media> => {
    const { url, ticketId, createdAt } = mediaInput;

    const ticket = await prisma.ticket.findUnique({
      where: { id: ticketId },
    });

    if (!url) {
      throw new Error("Media URL is required");
    }

    if (!ticketId) {
      throw new Error("Ticket ID is required");
    }

    if (!createdAt) {
      throw new Error("Create date is required");
    }

    if (!(await isUserMemberOfProject(ticket?.projectId, userId))) {
      throw new Error("User is not a member of the project");
    }

    return mediaRepository.create(mediaInput);
  },

  delete: (mediaId: number): Promise<Number> => {
    if (!mediaId) {
      throw new Error("Media ID is required");
    }

    if (typeof mediaId !== "number") {
      throw new Error("Media ID must be a number");
    }

    if (mediaId < 1) {
      throw new UserInputError("Invalid argument value", {
        argumentName: "id",
      });
    }

    return mediaRepository.delete(mediaId);
  },
};

export default mediaService;
