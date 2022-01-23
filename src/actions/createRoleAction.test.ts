import createRoleAction from "./createRoleAction";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const myMockFn = jest.fn().mockImplementationOnce(() => Promise.resolve());
afterAll(() => {
  return expect(prisma.$disconnect()).resolves;
});

describe("create role action - unit", () => {
  it("create new role correctly", async () => {
    const name = "roletest";

    await createRoleAction({ prisma, name });
    const [savedRole] = await prisma.role.findMany({
      where: { name },
      take: 1,
    });
    expect(savedRole.name).toBe(name);
  });
});
