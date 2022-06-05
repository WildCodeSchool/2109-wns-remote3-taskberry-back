import { Ticket, PrismaClient } from "@prisma/client";
import getTicketAction from "../actions/getTicketAction";
import isUserAdminOfProject from "../helpers/isUserAdminOfProject";
import isUserMemberOfProject from "../helpers/isUserMemberOfProject";
import { PartialUpdateTicketInput, TicketInput } from "../inputs/TicketInput";
import ticketsRepository from "../repositories/ticketsRepository";
const { UserInputError } = require("apollo-server");

const prisma = new PrismaClient();

const ticketService = {
  getTicket: async (
    ticketId: number,
    userId: number
  ): Promise<Ticket | null> => {
    if (!ticketId) {
      throw new Error("Ticket ID is required");
    }

    if (ticketId < 1) {
      throw new UserInputError("Invalid argument value", {
        argumentName: "id",
      });
    }

    const ticket = await getTicketAction({ id: ticketId });

    if (!ticket) {
      throw new Error("Ticket doesn't exist");
    }

    if (!(await isUserMemberOfProject(ticket?.projectId, userId))) {
      throw new Error("User is not a member of the project");
    }

    return ticketsRepository.getTicketById(ticketId);
  },

  create: async (ticketInput: TicketInput): Promise<Ticket> => {
    const { name, projectId, assigneeId } = ticketInput;

    if (!name) {
      throw new Error("Name is required");
    }

    if (name.length > 30) {
      throw new Error("Name should have at least one character and max 30");
    }

    if (!(await isUserMemberOfProject(projectId, assigneeId))) {
      throw new Error("User is not a member of the project");
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

  update: async (
    partialInput: PartialUpdateTicketInput,
    userId: number
  ): Promise<Ticket> => {
    const { id } = partialInput;

    if (!id) {
      throw new Error("TicketId is required");
    }

    const ticket = await getTicketAction({ id });

    if (!(await isUserMemberOfProject(ticket?.projectId, userId))) {
      throw new Error("User is not a member of the project");
    }

    return ticketsRepository.update(partialInput);
  },

  delete: async (ticketId: number, userId: number): Promise<Number> => {
    if (!ticketId) {
      throw new Error("Ticket ID is required");
    }

    if (typeof ticketId !== "number") {
      throw new Error("Ticket ID must be a number");
    }

    const ticket = await getTicketAction({ id: ticketId });

    if (!(await isUserAdminOfProject(ticket?.projectId, userId))) {
      throw new Error("User is not the project Administrator");
    }

    return ticketsRepository.delete(ticketId);
  },
};

export default ticketService;
