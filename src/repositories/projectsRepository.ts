import { PrismaClient } from "@prisma/client";
import { UserProjects } from "../models/project/UserProjects";
import { ProjectInput } from "../inputs/project/ProjectInput";
import { Project } from '../models/project/Project';
import { NewMembersInput } from '../inputs/project/newMembersInput';

const prisma = new PrismaClient();

const projectsRepository = {
  create: async (projectInput: ProjectInput): Promise<Project> => {
    const { title, description, createdAt, estimateEndAt, members } =
      projectInput;
    const { userId, role } = members;

    return await prisma.project.create({
      data: {
        title,
        description,
        createdAt,
        estimateEndAt,
        members: {
          create: [
            { user: { connect: { id: userId } }, role }
          ]
        },
      },
    });
  },

  addMembers: async (
    data: [NewMembersInput]
  ): Promise<number> => {
    await prisma.usersOnProjects.createMany({
      data,
      skipDuplicates: true,
    })
    return data.length
  },

  findUserProjects: async (userId: number): Promise<UserProjects[]> => {
    return await prisma.project.findMany({
      where: {
        members: {
          some: {
            userId,
          },
        },
      },
      select: {
        id: true,
        title: true,
        description: true,
        createdAt: true,
        estimateEndAt: true,
        members: {
          select: {
            user: {
              select: {
                profilePicture: true,
                firstName: true,
                lastName: true,
              }
            },
            role: true,
          }
        },
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 2
    });
  },

  findById: async (id: number): Promise<Project | null> => {
    return await prisma.project.findUnique({
      where: {
        id,
      },
    });
  },

  delete: async (id: number): Promise<number> => {
    await prisma.project.delete({
      where: {
        id
      }
    })
    return id
  }
};

export default projectsRepository;
