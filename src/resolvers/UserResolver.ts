import {
  Resolver,
  Query,
  Mutation,
  Ctx,
  Arg,
  InputType,
  Field,
} from "type-graphql";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { Context } from "../context";
import { User } from "../models/User";

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

@InputType()
class UserCreateInput {
  @Field(() => String)
  profilePicture!: string;

  @Field(() => String)
  firstName!: string;

  @Field(() => String)
  lastName!: string;

  @Field()
  email!: string;

  @Field()
  password!: string;
}

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async getUsers(@Ctx() ctx: Context) {
    return ctx.prisma.users.findMany();
  }

  @Query(() => User)
  async getUser(@Ctx() ctx: Context, @Arg("id") id: number) {
    return ctx.prisma.users.findUnique({ where: { id: id } });
  }

  @Query(() => String)
  async loginUser(
    @Ctx() ctx: Context,
    @Arg("email") email: string,
    @Arg("password") password: string
  ) {
    const userToVerify: User | null = await ctx.prisma.users.findUnique({
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

  @Mutation(() => User)
  async createUser(
    @Arg("data") data: UserCreateInput,
    @Ctx() ctx: Context
  ): Promise<User> {
    const hash: string = await bcrypt.hash(data.password, saltRounds);

    return ctx.prisma.users.create({
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
