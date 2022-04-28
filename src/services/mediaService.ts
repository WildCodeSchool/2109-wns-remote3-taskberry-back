import { PrismaClient } from "@prisma/client";
import { UserInputError } from "apollo-server";
import { MediaInput } from "../inputs/MediaInput";
import { Media } from "../models/Media";
import mediaRepository from "../repositories/mediaRepository";

const prisma = new PrismaClient();

const mediaService = {
  getTicketMedia: async (ticketId: number): Promise<Media[]> => {
    const isTicketExists = await prisma.ticket.findUnique({
      where: { id: ticketId },
    });

    if (!isTicketExists) {
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
    return mediaRepository.getTicketMedia(ticketId);
  },

  create: async (mediaInput: MediaInput): Promise<Media> => {
    const { url, ticketId, createdAt } = mediaInput;

    if (!url) {
      throw new Error("Media URL is required");
    }

    if (!ticketId) {
      throw new Error("Ticket ID is required");
    }

    if (!createdAt) {
      throw new Error("Create date is required");
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
