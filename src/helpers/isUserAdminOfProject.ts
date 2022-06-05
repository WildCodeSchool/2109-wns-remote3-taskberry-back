import { PrismaClient } from "@prisma/client";
import isRoleAdmin from "./isRoleAdmin";

const prisma = new PrismaClient();

export default async function (
  projectId: number | undefined,
  userId: number | undefined
) {
  const userInProject = await prisma.usersInProjects.findFirst({
    where: { projectId, userId },
  });

  if (!userInProject) {
    return false;
  }

  const isUserAdmin = await isRoleAdmin(userInProject.roleId);

  if (isUserAdmin) {
    return true;
  }

  return false;
}
