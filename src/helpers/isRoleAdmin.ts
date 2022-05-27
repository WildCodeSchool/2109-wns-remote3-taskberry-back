import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function (roleId: number) {
  const role = await prisma.role.findUnique({
    where: { id: roleId },
  });

  if (role?.name === "Administrateur") {
    return true;
  } else {
    return false;
  }
}
