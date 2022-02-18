import { Ticket } from "@prisma/client";
import { TicketInput } from "../inputs/TicketInput";
import ticketsRepository from "../repositories/ticketsRepository";

const ticketService = {
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
