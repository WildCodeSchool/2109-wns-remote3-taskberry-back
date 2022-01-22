import { Arg, Mutation, Resolver } from "type-graphql";
import { TicketInput } from "../inputs/TicketInput";
import { Ticket } from "../models/Ticket";
import ticketService from "../services/ticketsService";


@Resolver((of) => Ticket)
export class TicketResolver {
  @Mutation(() => Ticket)
  async createTicket(@Arg("ticketInput") ticketInput: TicketInput) {
    return await ticketService.create(ticketInput);
  }
}
