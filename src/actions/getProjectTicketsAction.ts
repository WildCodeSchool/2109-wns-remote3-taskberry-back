import { PrismaClient, Ticket } from "@prisma/client";

export interface ProjectTicketsActionParams {
  prisma: PrismaClient;
  projectId: number;
}

const getProjectTickets = async ({
  prisma,
  projectId,
}: ProjectTicketsActionParams): Promise<Ticket[] | [] | null> => {
  const isProjectExists = await prisma.project.findUnique({
    where: { id: projectId },
  });

  if (!isProjectExists) {
    return null;
  }

  return await prisma.ticket.findMany({
    where: { projectId: projectId },
  });
};

export default getProjectTickets;
