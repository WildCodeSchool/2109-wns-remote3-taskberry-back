import { PrismaClient, Project } from "@prisma/client";

const prisma = new PrismaClient();

export interface CreateProjectActionParams {
  name: string;
  description: string;
  createdAt: string;
  estimateEndAt: string;
  userId: number;
}

const createProjectAction = async ({
  name,
  description,
  createdAt,
  estimateEndAt,
  userId,
}: CreateProjectActionParams): Promise<Project> => {
  const project = await prisma.project.create({
    data: {
      name,
      description,
      createdAt,
      estimateEndAt,
    },
  });

  await prisma.usersInProjects.create({
    data: {
      userId,
      projectId: project.id,
      roleId: 1,
    },
  });

  return project;
};
export default createProjectAction;
