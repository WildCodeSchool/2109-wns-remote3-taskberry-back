import { PrismaClient, Status } from "@prisma/client";

const prisma = new PrismaClient();

const createStatusAction = async ({
  name,
}: {
  name: string;
}): Promise<Status> => {
  return await prisma.status.create({
    data: { name },
  });
};
export default createStatusAction;
