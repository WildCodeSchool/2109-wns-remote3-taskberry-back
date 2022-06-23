import { PrismaClient } from "@prisma/client";
import { UserInputError } from "apollo-server";
import isUserAdminOfProject from "../helpers/isUserAdminOfProject";
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

  delete: async (mediaId: number, userId: number): Promise<Number> => {
    const isMediaExists = await prisma.media.findUnique({
      where: { id: mediaId },
    });

    if (!isMediaExists) {
      throw new Error("Media doesn't exist");
    }

    const ticket = await prisma.ticket.findUnique({
      where: { id: isMediaExists.ticketId },
    });

    if (!mediaId) {
      throw new Error("Media ID is required");
    }

    if (!(await isUserAdminOfProject(ticket?.projectId, userId))) {
      throw new Error("User is not the project Administrator");
    }

    return mediaRepository.delete(mediaId);
  },
};

export default mediaService;
