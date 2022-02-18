import { PrismaClient } from "@prisma/client";
import createStatusAction from "./createStatusAction";
const faker = require("@faker-js/faker");

const prisma = new PrismaClient();
afterAll(() => {
  return expect(prisma.$disconnect()).resolves;
});

describe("createStatusAction() - unit", () => {
  it("creates new status correctly", async () => {
    const name = faker.random.word();

    const savedStatus = await createStatusAction({
      prisma,
      name,
    });

    expect(savedStatus.name).toBe(name);
  });
});
