import projectService from "./projectsService";
import { PrismaClient } from "@prisma/client";
import createUserAction from "../actions/createUserAction";
import createRoleAction from "../actions/createRoleAction";

const faker = require("@faker-js/faker");
const prisma = new PrismaClient();

afterAll(() => {
  return expect(prisma.$disconnect()).resolves;
});

describe("projectService - security", () => {
  const createdAt = faker.date.recent();
  const estimateEndAt = faker.date.future();

  it("throw an error if trying to create a project with non-admin roleId", async () => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();

    const savedUser = await createUserAction({
      profilePicture: faker.image.people(500, 500),
      firstName,
      lastName,
      email: faker.internet.email(firstName, lastName),
      password: faker.internet.password(),
    });

    const savedRole = await createRoleAction({
      name: faker.name.jobDescriptor(),
    });

    const projectPromise = projectService.create({
      name: faker.internet.domainName(),
      description: faker.random.words(10),
      createdAt,
      estimateEndAt,
      UsersInProject: { userId: savedUser.id, roleId: savedRole.id },
    });

    await expect(projectPromise).rejects.toThrow(
      "User creating a project should have admin role"
    );
  });
});
