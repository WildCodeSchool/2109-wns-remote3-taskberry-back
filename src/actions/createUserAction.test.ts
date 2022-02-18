import createUserAction from "./createUserAction";
import { PrismaClient } from "@prisma/client";
const faker = require("@faker-js/faker");

const prisma = new PrismaClient();
afterAll(() => {
  return expect(prisma.$disconnect()).resolves;
});

describe("createUserAction() - unit", () => {
  const profilePicture = faker.image.people(500, 500);
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const email = faker.internet.email(firstName, lastName);
  const password = faker.internet.password();

  it("creates new user correctly", async () => {
    const savedUser = await createUserAction({
      prisma,
      profilePicture,
      firstName,
      lastName,
      email,
      password,
    });

    expect(savedUser.profilePicture).toBe(profilePicture);
    expect(savedUser.firstName).toBe(firstName);
    expect(savedUser.lastName).toBe(lastName);
    expect(savedUser.email).toBe(email);
  });

  it("fails if tries to create records with the same user twice", async () => {
    await expect(() =>
      createUserAction({
        prisma,
        profilePicture,
        firstName,
        lastName,
        email,
        password,
      })
    ).rejects.toThrow(
      "Unique constraint failed on the constraint: `User_email_key`"
    );
  });
});
