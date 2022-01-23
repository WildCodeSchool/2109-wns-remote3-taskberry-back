import { PrismaClient, User } from "@prisma/client";

export interface CreateUserActionParams {
  prisma: PrismaClient;
  profilePicture: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const createUserAction = async ({
  prisma,
  profilePicture,
  firstName,
  lastName,
  email,
  password,
}: CreateUserActionParams): Promise<User> => {
  return await prisma.user.create({
    data: { profilePicture, firstName, lastName, email, password },
  });
};
export default createUserAction;
