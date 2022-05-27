import { PrismaClient, Ticket } from "@prisma/client";

const prisma = new PrismaClient();

export interface UpdateTicketActionParams {
  id: number;
  name?: string;
  description?: string;
  projectId?: number;
  statusId?: number;
  assigneeId?: number;
  createdAt?: string;
}

const updateTicketAction = async ({
  id,
  name,
  description,
  projectId,
  statusId,
  assigneeId,
  createdAt,
}: UpdateTicketActionParams): Promise<Ticket> => {
  return await prisma.ticket.update({
    where: { id: id },
    data: { name, description, projectId, statusId, assigneeId, createdAt },
  });
};

export default updateTicketAction;
