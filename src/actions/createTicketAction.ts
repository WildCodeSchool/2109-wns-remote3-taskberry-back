import { PrismaClient, Ticket } from "@prisma/client";

export interface CreateTicketActionParams {
  prisma: PrismaClient;
  name: string;
  description: string;
  projectId: number;
  statusId: number;
  assigneeId: number;
  createdAt: string;
}

const createTicketAction = async ({
  prisma,
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
