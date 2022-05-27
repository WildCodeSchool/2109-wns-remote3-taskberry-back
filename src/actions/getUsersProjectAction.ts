import { PrismaClient, Project } from "@prisma/client";
import { UserQuery } from "../models/User";

const prisma = new PrismaClient();

export interface GetUsersProjectActionParams {
  projectId: number;
}

const getUsersProject = async ({
  projectId,
}: GetUsersProjectActionParams): Promise<UserQuery[] | [] | null> => {
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
          project: true,
          projectId: true,
        },
      },
    },
  });
};

export default getUsersProject;
