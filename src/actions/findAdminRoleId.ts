import { PrismaClient } from "@prisma/client";
import configService from "../services/configService";

const prisma = new PrismaClient();

export default async function () {
  const role = await prisma.role.findFirst({
    where: { id: 1 },
  });

  if (!role) {
    await configService.createBaseData();

    const role = await prisma.role.findUnique({
      where: { id: 1 },
    });

    return role?.id;
  }

  return role.id;
}
