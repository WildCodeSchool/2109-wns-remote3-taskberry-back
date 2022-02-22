import { PrismaClient, Ticket } from "@prisma/client";

export interface GetTicketActionParams {
  prisma: PrismaClient;
  id: number;
}

const getTicketAction = async ({
  prisma,
  id,
}: GetTicketActionParams): Promise<Ticket | null> => {
  return await prisma.ticket.findUnique({
    where: { id: id },
  });
};

export default getTicketAction;
