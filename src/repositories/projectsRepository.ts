import { PrismaClient, UsersInProjects } from "@prisma/client";
import { Project } from "../models/Project";
import { ProjectInput } from "../inputs/ProjectInput";
import { UsersProject } from "../models/UsersProject";

const prisma = new PrismaClient();

const projectsRepository = {
  create: async (projectInput: ProjectInput): Promise<Project> => {
    const { name, description, createdAt, estimateEndAt, UsersInProject } =
      projectInput;
    const { userId, roleId } = UsersInProject;

    const newProject = await prisma.project.create({
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
        projectId: newProject.id,
        roleId,
      },
    });

    return newProject;
  },

  addProjectMember: async (
    memberInput: UsersInProjects
  ): Promise<UsersProject> => {
    const { userId, projectId, roleId } = memberInput;

    const isUserInProject = await prisma.usersInProjects.findUnique({
      where: { userId_projectId_roleId: { userId, projectId, roleId } },
    });

    if (isUserInProject) {
      throw new Error("User already in project");
    }

    return await prisma.usersInProjects.create({
      data: {
        userId,
        projectId,
        roleId,
      },
    });
  },
};

export default projectsRepository;
