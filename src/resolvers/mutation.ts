import { PrismaClient } from "@prisma/client";
import User from "../models/User";

const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const saltRounds = 10;

const Mutation = {
  newUser: async (
    _parent: User,
    args: {
      profilePicture: string;
      firstName: string;
      lastName: string;
      email: string;
      password: string;
    }
  ) => {
    try {
      const hash = await bcrypt.hash(args.password, saltRounds);

      return prisma.users.create({
        data: {
          profilePicture: args.profilePicture,
          firstName: args.firstName,
          lastName: args.lastName,
          email: args.email,
          password: hash,
        },
      });
    } catch (error) {
      throw new Error("Enregistrement de nouvel utilisateur échoué");
    }
  },
};

export default Mutation;
