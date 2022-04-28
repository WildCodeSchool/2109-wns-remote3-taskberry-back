import { PrismaClient } from "@prisma/client";
import createMediaAction from "./createMediaAction";
const faker = require("@faker-js/faker");

const prisma = new PrismaClient();
afterAll(() => {
  return expect(prisma.$disconnect()).resolves;
});

describe("createMediaAction() - unit", () => {
  it("creates new media correctly", async () => {
    const name = "test.jpg";
    const type = "image/jpeg";
    const url = faker.image.imageUrl();
    const createdAt = faker.date.recent();

    const savedMedia = await createMediaAction({
      prisma,
      name,
      type,
      url,
      createdAt,
      ticketId: 1,
    });

    expect(savedMedia).toBeTruthy();
    expect(savedMedia.name).toBe(name);
    expect(savedMedia.type).toBe(type);
    expect(savedMedia.url).toBe(url);
  });
});
