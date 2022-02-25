import { PrismaClient, Project } from "@prisma/client";

export interface GetProjectActionParams {
  prisma: PrismaClient;
  projectId: number;
}

const getProjectAction = async ({
  prisma,
  projectId,
}: GetProjectActionParams): Promise<Project | null> => {
  return await prisma.project.findUnique({
    where: { id: projectId },
  });
};

export default getProjectAction;
