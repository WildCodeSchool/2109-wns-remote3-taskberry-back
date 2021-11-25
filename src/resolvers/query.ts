import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const Query = {
  users: () => prisma.users.findMany(),
};

export default Query;
