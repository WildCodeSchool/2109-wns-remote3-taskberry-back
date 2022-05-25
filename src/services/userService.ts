import { AuthenticationError } from "apollo-server";
import { PrismaClient, User } from "@prisma/client";
import userRepository from "../repositories/userRepository";
import { UserMutation, UserQuery } from "../models/User";

const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

export const getUserByToken = async (token: string | undefined) => {
  if (!token) {
    throw new AuthenticationError("missing jwt");
  }

  const decodeToken: any = jwt.verify(token, process.env.JWT_SECRET_KEY);
  if (!decodeToken) {
    throw new AuthenticationError("jwt expired");
  }

  const user = await prisma.user.findUnique({
    where: { email: decodeToken.email },
  });

  return user;
};

const userService = {
  getUsers: async (token: string | undefined): Promise<UserQuery[]> => {
    await getUserByToken(token);
    return userRepository.getUsers();
  },

  getUser: async (
    token: string | undefined,
    id: number
  ): Promise<UserQuery | null> => {
    const isUserExist = await prisma.user.findUnique({ where: { id: id } });

    await getUserByToken(token);

    if (!isUserExist) {
      throw Error("User does not exist");
    }

    return userRepository.getUser(id);
  },

  loginUser: async (email: string, password: string): Promise<string> => {
    const userToVerify: User | null = await prisma.user.findUnique({
      where: { email: email },
    });

    if (userToVerify) {
      const verified: boolean = await bcrypt.compare(
        password,
        userToVerify.password
      );

      if (verified) {
        const token = await jwt.sign(userToVerify, "taskberry", {
          expiresIn: "2h",
        });
        return token;
      } else {
        throw new AuthenticationError("Invalid credentials");
      }
    } else {
      throw Error("User does not exist");
    }
  },

  createUser: async (userInput: UserMutation) => {
    return userRepository.createUser(userInput);
  },
};

export default userService;
