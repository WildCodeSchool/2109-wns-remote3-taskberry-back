import { Resolver, Query, Mutation, Ctx, Arg } from "type-graphql";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { UserMutation, UserQuery } from "../models/User";
import { AuthenticationError } from "apollo-server-errors";

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

interface Context {
  token: string | undefined;
}

const getUserByToken = async (token: string | undefined) => {
  if (!token) {
    throw new AuthenticationError("missing jwt");
  }

  let decodeToken: any = jwt.verify(token, "taskberry");
  if (!decodeToken) {
    throw new AuthenticationError("jwt expired");
  }

  const user = await prisma.users.findUnique({
    where: { email: decodeToken.email },
  });

  return user;
};

@Resolver()
export class UserResolver {
  @Query(() => [UserQuery])
  async getUsers(@Ctx() ctx: Context) {
    await getUserByToken(ctx.token);

    return prisma.users.findMany();
  }

  @Query(() => UserQuery)
  async getUser(@Arg("id") id: number, @Ctx() ctx: Context) {
    await getUserByToken(ctx.token);

    return prisma.users.findUnique({ where: { id: id } });
  }

  @Query(() => String)
  async loginUser(
    @Arg("email") email: string,
    @Arg("password") password: string
  ) {
    const userToVerify: UserMutation | null = await prisma.users.findUnique({
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
        throw Error("wrong password");
      }
    } else {
      throw Error("user not found");
    }
  }

  @Mutation(() => UserQuery)
  async createUser(
    @Arg("data") data: UserMutation
  ): Promise<UserQuery> {
    const hash: string = await bcrypt.hash(data.password, saltRounds);

    return prisma.users.create({
      data: {
        profilePicture: data.profilePicture,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: hash,
      },
    });
  }
}
