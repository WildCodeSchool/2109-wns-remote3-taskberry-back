import { PrismaClient, User } from "@prisma/client";
import { UserMutation } from "../models/User";
import {hash} from "bcryptjs";

const prisma = new PrismaClient();
const saltRounds = 10;

const userRepository = {
  getUsers: async (): Promise<User[]> => {
    return prisma.user.findMany();
  },

  getUser: async (id: number): Promise<User | null> => {
    return prisma.user.findUnique({
      where: { id: id },
    });
  },

  createUser: async ({
    profilePicture,
    email,
    firstName,
    lastName,
    password,
  }: UserMutation) => {
    const passwordHash: string = await hash(password, saltRounds);

    return prisma.user.create({
      data: {
        profilePicture,
        email,
        firstName,
        lastName,
        password: passwordHash,
      },
    });
  },
};

export default userRepository;
