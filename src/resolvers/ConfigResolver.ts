import { PrismaClient } from "@prisma/client";
import { Resolver, Mutation } from "type-graphql";
import configService from "../services/configService";

const prisma = new PrismaClient();

@Resolver()
export class ConfigResolver {
  @Mutation(() => String)
  async createBaseData() {
    return await configService.createBaseData();
  }
}
