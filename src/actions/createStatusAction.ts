import { PrismaClient, Status } from "@prisma/client";

export interface CreateStatusActionParams {
  prisma: PrismaClient;
  name: string;
}

const createStatusAction = async ({
  prisma,
  name,
}: CreateStatusActionParams): Promise<Status> => {
  return await prisma.status.create({
    data: { name },
  });
};
export default createStatusAction;
