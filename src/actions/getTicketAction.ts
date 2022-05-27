import { PrismaClient, Ticket } from "@prisma/client";

const prisma = new PrismaClient();

const getTicketAction = async ({
  id,
}: {
  id: number;
}): Promise<Ticket | null> => {
  return await prisma.ticket.findUnique({
    where: { id: id },
  });
};

export default getTicketAction;
