import projectService from "../../services/projectsService";
import { PrismaClient } from "@prisma/client";
import createUserAction from "../../actions/createUserAction";
import createRoleAction from "../../actions/createRoleAction";

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
      description: faker.random.words(5),
      createdAt,
      estimateEndAt,
      UsersInProject: { userId: savedUser.id, roleId: savedRole.id },
    });

    await expect(projectPromise).rejects.toThrow(
      "User creating a project should have admin role"
    );
  });

  it("throw an error if user trying to delete a project is not the admin", async () => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();

    const savedUser = await createUserAction({
      profilePicture: faker.image.people(500, 500),
      firstName,
      lastName,
      email: faker.internet.email(firstName, lastName),
      password: faker.internet.password(),
    });

    const savedUser2 = await createUserAction({
      profilePicture: faker.image.people(500, 500),
      firstName,
      lastName,
      email: faker.internet.email(firstName, lastName),
      password: faker.internet.password(),
    });

    const savedProject = await projectService.create({
      name: faker.internet.domainName(),
      description: faker.random.words(5),
      createdAt,
      estimateEndAt,
      UsersInProject: { userId: savedUser.id, roleId: 1 },
    });

    await projectService.addProjectMember({
      roleId: 2,
      userId: savedUser2.id,
      projectId: savedProject.id,
    });

    const projectPromise = projectService.delete(
      savedProject.id,
      savedUser2.id
    );

    await expect(projectPromise).rejects.toThrow(
      "User is not the project Administrator"
    );
  });
});
