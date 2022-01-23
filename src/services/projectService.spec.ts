import projectService from "./projectsService";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import createUserAction from "../actions/createUserAction";
import createRoleAction from "../actions/createRoleAction";

const prisma = new PrismaClient();

afterAll(() => {
  return expect(prisma.$disconnect()).resolves;
});

describe("projectService", () => {
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
  it("create new role correctly", async () => {
    const name = "roletest";

    await createRoleAction({ prisma, name });
    const [savedUser] = await prisma.role.findMany({
      where: { name },
      take: 1,
    });
    expect(savedUser.name).toBe(name);
  });
  it("should create a new project", async () => {
    // needs refacto use getUser to have user information (userId, roleId)
    const newProject = await projectService.create({
      name: "projet 1",
      description: "ras",
      createdAt: new Date(),
      UsersInProject: { userId: 1, roleId: 1 },
    });
    const projectDB = await projectService.getProjectById(newProject.id);

    expect(newProject.id).toEqual(projectDB?.id);
    expect(newProject.name).toEqual("projet 1");
    expect(newProject.description).toEqual("ras");
    expect(projectDB?.name).toBe(newProject.name);
  });
});
