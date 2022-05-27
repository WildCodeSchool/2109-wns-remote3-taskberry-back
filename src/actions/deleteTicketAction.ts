import { PrismaClient, Ticket } from "@prisma/client";

const prisma = new PrismaClient();

const deleteTicketAction = async ({ id }: { id: number }): Promise<Ticket> => {
  return await prisma.ticket.delete({
    where: { id: id },
  });
};

export default deleteTicketAction;
