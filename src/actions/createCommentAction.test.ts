import { PrismaClient } from "@prisma/client";
import createCommentAction from "./createCommentAction";
const faker = require("@faker-js/faker");

const prisma = new PrismaClient();
afterAll(() => {
  return expect(prisma.$disconnect()).resolves;
});

describe("createCommentAction() - unit", () => {
  it("creates new comment correctly", async () => {
    const description = faker.random.words(10);
    const createdAt = faker.date.recent();

    const savedComment = await createCommentAction({
      prisma,
      description,
      createdAt,
      userId: 1,
      ticketId: 1,
    });

    expect(savedComment).toBeTruthy();
    expect(savedComment.description).toBe(description);
  });
});
