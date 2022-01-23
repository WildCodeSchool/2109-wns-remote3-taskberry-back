import createUserAction from "./createUserAction";
import { v4 as uuidv4 } from "uuid";
import { PrismaClient } from "@prisma/client";

// jest attend que le callback done soit appelé avant de passer au test suivant
// explications : https://jestjs.io/docs/asynchronous#resolves--rejects
// error TS = void conflicts with type any
// const prisma = new PrismaClient();
// afterAll(async (done) => {
//   await prisma.$disconnect();
//   done();
// });
const prisma = new PrismaClient();
const myMockFn = jest.fn().mockImplementationOnce(() => Promise.resolve());
afterAll(() => {
  return expect(prisma.$disconnect()).resolves;
});
describe("createUserAction() - unit", () => {
  it("creates new user correctly", async () => {
    const profilePicture = "toto.jpg";
    const firstName = "John";
    const lastName = "Doe";
    const email = `${uuidv4()}@test.com`;
    const password = Math.random().toString(36).slice(2);

    await createUserAction({
      prisma,
      profilePicture,
      firstName,
      lastName,
      email,
      password,
    });

    const [savedUser] = await prisma.user.findMany({
      where: { profilePicture, firstName, lastName, email, password },
      take: 1,
    });

    expect(savedUser.email).toBe(email);
  });

  it("fails if tries to create records with the same user twice", async () => {
    const profilePicture = "toto.jpg";
    const firstName = "John";
    const lastName = "Doe";
    const email = `${uuidv4()}@test.com`;
    const password = Math.random().toString(36).slice(2);

    await createUserAction({
      prisma,
      profilePicture,
      firstName,
      lastName,
      email,
      password,
    });

    const [savedUser] = await prisma.user.findMany({
      where: { email },
      take: 1,
    });

    expect(savedUser.email).toBe(email);

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
