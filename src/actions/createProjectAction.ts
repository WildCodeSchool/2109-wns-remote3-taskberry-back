import { PrismaClient, Project } from "@prisma/client";
import findAdminRoleId from "../helpers/findAdminRoleId";

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

  const adminRoleId = await findAdminRoleId();

  await prisma.usersInProjects.create({
    data: {
      userId,
      projectId: project.id,
      roleId: Number(adminRoleId),
    },
  });

  return project;
};
export default createProjectAction;
