import { PrismaClient, User } from "@prisma/client";
import { UserMutation } from "../models/User";

const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
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
    id,
    profilePicture,
    email,
    firstName,
    lastName,
    password,
  }: UserMutation) => {
    const hash: string = await bcrypt.hash(password, saltRounds);

    return prisma.user.create({
      data: {
        id,
        profilePicture,
        email,
        firstName,
        lastName,
        password: hash,
      },
    });
  },
};

export default userRepository;
