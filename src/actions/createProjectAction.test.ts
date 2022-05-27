import { PrismaClient } from "@prisma/client";
import createProjectAction from "./createProjectAction";
const faker = require("@faker-js/faker");

const prisma = new PrismaClient();
afterAll(() => {
  return expect(prisma.$disconnect()).resolves;
});

describe("createProjectAction() - unit", () => {
  it("creates new project correctly", async () => {
    const name = faker.internet.domainName();
    const description = faker.random.words(10);
    const createdAt = faker.date.recent();
    const estimateEndAt = faker.date.future();

    const savedProject = await createProjectAction({
      name,
      description,
      createdAt,
      estimateEndAt,
      userId: 1,
    });

    expect(savedProject.name).toBe(name);
    expect(savedProject.description).toBe(description);
  });
});
