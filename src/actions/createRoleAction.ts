import { PrismaClient, Role } from "@prisma/client";

export interface CreateRoleActionParams {
  prisma: PrismaClient;
  name: string;
}

const createRoleAction = async ({
  prisma,
  name,
}: CreateRoleActionParams): Promise<Role> => {
  return await prisma.role.create({ data: { name } });
};

export default createRoleAction;
