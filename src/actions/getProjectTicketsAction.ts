import { PrismaClient, Ticket } from "@prisma/client";

const prisma = new PrismaClient();

const getProjectTickets = async ({
  projectId,
}: {
  projectId: number;
}): Promise<Ticket[] | [] | null> => {
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
