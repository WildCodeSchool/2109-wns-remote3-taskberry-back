import { Resolver, Query, Mutation, Ctx, Arg } from "type-graphql";
import { UserMutation, UserQuery } from "../models/User";
import userService from "../services/userService";

interface Context {
  token: string | undefined;
}

@Resolver()
export class UserResolver {
  @Query(() => [UserQuery])
  async getUsers(@Ctx() ctx: Context) {
    await userService.getUsers(ctx.token);
  }

  @Query(() => UserQuery)
  async getUser(@Arg("id") id: number, @Ctx() ctx: Context) {
    return userService.getUser(ctx.token, id);
  }

  @Query(() => String)
  async loginUser(
    @Arg("email") email: string,
    @Arg("password") password: string
  ) {
    return userService.loginUser(email, password);
  }

  @Mutation(() => UserQuery)
  async createUser(
    @Arg("userInput") userInput: UserMutation
  ): Promise<UserQuery> {
    return userService.createUser(userInput);
  }
}
