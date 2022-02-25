import { PrismaClient, Project } from "@prisma/client";
import { UserQuery } from "../models/User";

export interface GetUsersProjectActionParams {
  prisma: PrismaClient;
  projectId: number;
}

const getUsersProject = async ({
  prisma,
  projectId,
}: GetUsersProjectActionParams): Promise<UserQuery[] | [] | null> => {
  return await prisma.user.findMany({
    where: {
        UsersInProject: {
          some: {
            project: {
              id: projectId,
            }
          },
        },
      },
      
      select: {
        profilePicture: true,
        firstName: true,
        lastName: true,
        email: true,
        UsersInProject: {
          select: { 
            project: true,
            projectId: true,
          }
        },
      },
  });
};

export default getUsersProject;