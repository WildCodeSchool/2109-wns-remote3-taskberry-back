import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export interface CreateUserActionParams {
  profilePicture: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const createUserAction = async ({
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
