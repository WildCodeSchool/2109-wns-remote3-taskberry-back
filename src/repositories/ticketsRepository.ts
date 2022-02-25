import { PrismaClient } from "@prisma/client";
import { PartialUpdateTicketInput, TicketInput } from "../inputs/TicketInput";
import { Ticket } from "../models/Ticket";

const prisma = new PrismaClient();

const ticketsRepository = {
  getTicketById: async (ticketId: number): Promise<Ticket | null> => {
    return prisma.ticket.findUnique({
      where: {
        id: ticketId,
      },
    });
  },

  create: async (ticketInput: TicketInput): Promise<Ticket> => {
    const { name, description, createdAt, projectId, assigneeId, statusId } =
      ticketInput;
    return await prisma.ticket.create({
      data: {
        name,
        description,
        createdAt,
        projectId,
        statusId,
        assigneeId,
      },
    });
  },

  getProjectTickets: async (
    projectId: number
  ): Promise<Ticket[] | [] | null> => {
    const isProjectExists = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!isProjectExists) {
      return null;
    }

    return prisma.ticket.findMany({
      where: {
        projectId: projectId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  },

  update: async (
    updateTicketInput: PartialUpdateTicketInput
  ): Promise<Ticket> => {
    const {
      id,
      name,
      description,
      finishedAt,
      statusId,
      projectId,
      assigneeId,
    } = updateTicketInput;
    return await prisma.ticket.update({
      where: {
        id: id,
      },
      data: {
        name: name?.toLocaleLowerCase().trim(),
        description: description?.toLocaleLowerCase().trim(),
        finishedAt,
        statusId,
        projectId,
        assigneeId,
      },
    });
  },

  delete: async (ticketId: number): Promise<Number> => {
    await prisma.ticket.delete({
      where: {
        id: ticketId,
      },
    });

    return ticketId;
  },
};

export default ticketsRepository;
