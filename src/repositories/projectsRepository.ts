import { PrismaClient } from "@prisma/client";
import { Project } from "../models/Project";
import { ProjectInput } from "../inputs/ProjectInput";
import { UsersProject } from "../models/UsersProject";

const prisma = new PrismaClient();

const projectsRepository = {
  create: async (projectInput: ProjectInput): Promise<Project> => {
    const { name, description, createdAt, estimateEndAt, user } =
      projectInput;
    const { userId } = user;

    const newProject = await prisma.project.create({
      data: {
        name,
        description,
        createdAt,
        estimateEndAt,
        users: {
          connect: {
            id: userId
          }
        }
      },
    });

    return newProject;
  },

  addProjectMember: async (
    memberInput: any
  ): Promise<UsersProject> => {
    const { userId, projectId, roleId } = memberInput;

    // const isUserInProject = await prisma.usersInProjects.findUnique({
    //   where: { userId_projectId_roleId: { userId, projectId, roleId } },
    // });

    // if (isUserInProject) {
    //   throw new Error("User already in project");
    // }

    // return await prisma.usersInProjects.create({
    //   data: {
    //     userId,
    //     projectId,
    //     roleId,
    //   },
    // });

    await prisma.project.update({
      where: {
        id: projectId
      },
      data: {
        users: {
          connect: {
            id: userId
          }
        }
      }
    });

    await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        projects: {
          connect: {
            id: projectId
          }
        }
      }
    });
  },

  getUserProjects: async (userId: number): Promise<Project[]> => {
    return prisma.project.findMany({
      where: {
        users: {
          some: {
            id: userId,
          },
        },
      },
    });
  },

  getProjectById: async (projectId: number): Promise<Project | null> => {
    return prisma.project.findUnique({
      where: {
        id: projectId,
      },
      include: {
        users: {
          select: {
            firstName: true,
            lastName: true
          }
        }
      }
    });
  },
};

export default projectsRepository;
