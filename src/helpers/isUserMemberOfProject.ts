import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function (projectId: number, userId: number) {
  return await prisma.usersInProjects.findFirst({
    where: { projectId: projectId, userId },
  });
}
