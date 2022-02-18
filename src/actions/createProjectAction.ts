import { PrismaClient, Project } from "@prisma/client";

export interface CreateProjectActionParams {
  prisma: PrismaClient;
  name: string;
  description: string;
  createdAt: string;
  estimateEndAt: string;
}

const createProjectAction = async ({
  prisma,
  name,
  description,
  createdAt,
  estimateEndAt,
}: CreateProjectActionParams): Promise<Project> => {
  return await prisma.project.create({
    data: { name, description, createdAt, estimateEndAt },
  });
};
export default createProjectAction;
