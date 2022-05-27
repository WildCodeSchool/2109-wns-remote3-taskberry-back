import { PrismaClient, Ticket } from "@prisma/client";

const prisma = new PrismaClient();

export interface CreateTicketActionParams {
  name: string;
  description: string;
  projectId: number;
  statusId: number;
  assigneeId: number;
  createdAt: string;
}

const createTicketAction = async ({
  name,
  description,
  projectId,
  statusId,
  assigneeId,
  createdAt,
}: CreateTicketActionParams): Promise<Ticket> => {
  return await prisma.ticket.create({
    data: { name, description, projectId, statusId, assigneeId, createdAt },
  });
};

export default createTicketAction;
