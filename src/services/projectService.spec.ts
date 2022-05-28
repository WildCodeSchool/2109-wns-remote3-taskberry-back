import projectService from "./projectsService";
import { PrismaClient } from "@prisma/client";
import createUserAction from "../actions/createUserAction";
import createRoleAction from "../actions/createRoleAction";
const faker = require("@faker-js/faker");

const prisma = new PrismaClient();

afterAll(() => {
  return expect(prisma.$disconnect()).resolves;
});

describe("projectService", () => {
  const createdAt = faker.date.recent();
  const estimateEndAt = faker.date.future();

  it("creates new user correctly", async () => {
    const profilePicture = faker.image.people(500, 500);
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = faker.internet.email(firstName, lastName);

    const savedUser = await createUserAction({
      profilePicture,
      firstName,
      lastName,
      email,
      password: faker.internet.password(),
    });

    expect(savedUser.profilePicture).toBe(profilePicture);
    expect(savedUser.firstName).toBe(firstName);
    expect(savedUser.lastName).toBe(lastName);
    expect(savedUser.email).toBe(email);
  });

  it("create new role correctly", async () => {
    const name = faker.name.jobDescriptor();
    const savedRole = await createRoleAction({ name });

    expect(savedRole.name).toBe(name);
  });

  it("should create a new project", async () => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();

    const savedUser = await createUserAction({
      profilePicture: faker.image.people(500, 500),
      firstName,
      lastName,
      email: faker.internet.email(firstName, lastName),
      password: faker.internet.password(),
    });

    const newProject = await projectService.create({
      name: faker.internet.domainName(),
      description: faker.random.words(5),
      createdAt,
      estimateEndAt,
      UsersInProject: { userId: savedUser.id, roleId: 1 },
    });
    const projectDB = await projectService.getProjectById(newProject.id);

    expect(newProject.id).toEqual(projectDB?.id);
    expect(newProject.name).toEqual(projectDB?.name);
    expect(newProject.description).toEqual(projectDB?.description);
    expect(newProject.createdAt).toEqual(projectDB?.createdAt);
    expect(newProject.estimateEndAt).toEqual(projectDB?.estimateEndAt);
  });
});
