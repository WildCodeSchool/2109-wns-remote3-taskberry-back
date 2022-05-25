import { Ticket, PrismaClient } from "@prisma/client";
import { PartialUpdateTicketInput, TicketInput } from "../inputs/TicketInput";
import ticketsRepository from "../repositories/ticketsRepository";
const { UserInputError } = require("apollo-server");

const prisma = new PrismaClient();

const ticketService = {
  getTicket: async (
    ticketId: number,
    userId: number
  ): Promise<Ticket | null> => {
    const isTicketExists = await prisma.ticket.findUnique({
      where: { id: ticketId },
    });

    const isUserMemberOfProject = await prisma.usersInProjects.findFirst({
      where: { projectId: isTicketExists?.projectId, userId },
    });

    if (!ticketId) {
      throw new Error("Ticket ID is required");
    }

    if (ticketId < 1) {
      throw new UserInputError("Invalid argument value", {
        argumentName: "id",
      });
    }

    if (!isTicketExists) {
      throw new Error("Ticket doesn't exist");
    }

    if (!isUserMemberOfProject) {
      throw new Error("User is not a member of the project");
    }

    return ticketsRepository.getTicketById(ticketId);
  },

  create: (ticketInput: TicketInput): Promise<Ticket> => {
    const { name } = ticketInput;

    if (!name) {
      throw new Error("Name is required");
    }

    if (name.length > 30) {
      throw new Error("Name should have at least one character and max 30");
    }

    return ticketsRepository.create(ticketInput);
  },

  getProjectTickets: async (
    projectId: number
  ): Promise<Ticket[] | [] | null> => {
    const isProjectExists = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!projectId) {
      throw new Error("Project ID is required");
    }

    if (typeof projectId !== "number") {
      throw new Error("Project ID must be a number");
    }

    if (!isProjectExists) {
      throw new Error("Project doesn't exist");
    }

    return ticketsRepository.getProjectTickets(projectId);
  },

  update: (partialInput: PartialUpdateTicketInput): Promise<Ticket> => {
    const { id, name } = partialInput;

    if (!id) {
      throw new Error("TicketId is required");
    }
    return ticketsRepository.update(partialInput);
  },

  delete: (ticketId: number): Promise<Number> => {
    if (!ticketId) {
      throw new Error("Ticket ID is required");
    }

    if (typeof ticketId !== "number") {
      throw new Error("Ticket ID must be a number");
    }

    return ticketsRepository.delete(ticketId);
  },
};

export default ticketService;
