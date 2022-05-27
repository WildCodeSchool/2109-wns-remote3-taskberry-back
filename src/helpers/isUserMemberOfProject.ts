import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function (
  projectId: number | undefined,
  userId: number | undefined
) {
  return await prisma.usersInProjects.findFirst({
    where: { projectId: projectId, userId },
  });
}
