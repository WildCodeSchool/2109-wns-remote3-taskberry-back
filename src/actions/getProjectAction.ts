import { PrismaClient, Project } from "@prisma/client";

const prisma = new PrismaClient();

const getProjectAction = async ({
  projectId,
}: {
  projectId: number;
}): Promise<Project | null> => {
  return await prisma.project.findUnique({
    where: { id: projectId },
  });
};

export default getProjectAction;
