import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

const createRoleAction = async ({ name }: { name: string }): Promise<Role> => {
  return await prisma.role.create({ data: { name } });
};

export default createRoleAction;
