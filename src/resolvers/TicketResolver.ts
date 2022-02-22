import { Arg, Mutation, Resolver, Query } from "type-graphql";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { PartialUpdateTicketInput, TicketInput } from "../inputs/TicketInput";
import { Ticket } from "../models/Ticket";
import ticketService from "../services/ticketsService";
const { UserInputError } = require('apollo-server');
const { ARGUMENT_NAME } = require('../helpers/constant');

@Resolver((of) => Ticket)
export class TicketResolver {

  @Query(() => Ticket)
  async getTicket(@Arg("ticketId") ticketId: number) {
    return await ticketService.getTicket(ticketId);
  }
  @Mutation(() => Ticket)
  async createTicket(@Arg("ticketInput") ticketInput: TicketInput) {
    return await ticketService.create(ticketInput);
  }

  @Mutation(() => Ticket)
  async updateTicket(
    @Arg("partialInput") partialInput: PartialUpdateTicketInput): Promise<Ticket>  {
    const { id, statusId, projectId, assigneeId, name, description } = partialInput

    const ticketById = await prisma.ticket.findUnique({
      where: { id: id },
      });
    
    const statusById = statusId && await prisma.status.findUnique({
      where: { id: statusId },
    })

    const projectById = projectId && await prisma.project.findUnique({
      where: { id: projectId },
    })

    const assigneeById = assigneeId && await prisma.user.findUnique({
      where: { id: assigneeId },
    })

    if (id && !ticketById || statusId && !statusById || projectId && !projectById || assigneeId && !assigneeById) {
      throw new UserInputError('Invalid argument value', { argumentName: ticketById === null ? ARGUMENT_NAME.TICKET_ID : ARGUMENT_NAME.ID });
    }

    const isBlankName = name && !name.trim();
    const isBlankDescription = description && !description.trim()

    if (isBlankName || isBlankDescription) {
      throw new UserInputError('Invalid argument value', { argumentName: isBlankName  ? ARGUMENT_NAME.NAME : ARGUMENT_NAME.DESCRIPTION});
  }

    return await ticketService.update(partialInput);
  }

  @Mutation(() => Number)
  async deleteTicket(@Arg("ticketId") ticketId: number) {
    return await ticketService.delete(ticketId);
  }

  @Query(() => [Ticket])
  async getProjectTickets(@Arg("projectId") projectId: number) {
    return await ticketService.getProjectTickets(projectId);
  }
}

