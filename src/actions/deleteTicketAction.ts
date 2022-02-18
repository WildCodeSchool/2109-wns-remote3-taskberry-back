import { PrismaClient, Ticket } from "@prisma/client";

export interface DeleteTicketActionParams {
  prisma: PrismaClient;
  id: number;
}

const deleteTicketAction = async ({
  prisma,
  id,
}: DeleteTicketActionParams): Promise<Ticket> => {
  return await prisma.ticket.delete({
    where: { id: id },
  });
};

export default deleteTicketAction;
