import createRoleAction from "./createRoleAction";
import { PrismaClient } from "@prisma/client";
const faker = require("@faker-js/faker");

const prisma = new PrismaClient();
afterAll(() => {
  return expect(prisma.$disconnect()).resolves;
});

describe("create role action - unit", () => {
  it("create new role correctly", async () => {
    const name = faker.name.jobDescriptor();

    const savedRole = await createRoleAction({ name });
    expect(savedRole.name).toBe(name);
  });
});
