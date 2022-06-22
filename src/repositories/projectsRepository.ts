import { PrismaClient, UsersInProjects } from "@prisma/client";
import { Project } from "../models/Project";
import { ProjectInput } from "../inputs/ProjectInput";
import { UsersProject } from "../models/UsersProject";
import { UserQuery } from "../models/User";

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

  delete: async (projectId: number): Promise<Number> => {
    await prisma.usersInProjects.deleteMany({
      where: {
        projectId: projectId,
      },
    });

    await prisma.project.delete({
      where: {
        id: projectId,
      },
    });

    return projectId;
  },

  getUserProjects: async (userId: number): Promise<Project[]> => {
    return prisma.project.findMany({
      where: {
        UsersInProject: {
          some: {
            userId,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  },

  getProjectById: async (projectId: number): Promise<Project | null> => {
    return prisma.project.findUnique({
      where: {
        id: projectId,
      },
    });
  },

  getProjectUsers: async (projectId: number): Promise<UserQuery[] | []> => {
    const isProjectExists = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!isProjectExists) {
      throw new Error("Project does not exist");
    }

    return await prisma.user.findMany({
      where: {
        UsersInProject: {
          some: {
            project: {
              id: projectId,
            },
          },
        },
      },

      select: {
        id: true,
        profilePicture: true,
        firstName: true,
        lastName: true,
        email: true,
        UsersInProject: {
          select: {
            project: {
              select: {
                description: true,
                name: true,
              },
            },
            projectId: true,
          },
        },
      },
    });
  },
};

export default projectsRepository;
