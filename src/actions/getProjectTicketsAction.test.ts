import createTicketAction from "./createTicketAction";
import { PrismaClient } from "@prisma/client";
import createProjectAction from "./createProjectAction";
import createStatusAction from "./createStatusAction";
import createUserAction from "./createUserAction";
import deleteTicketAction from "./deleteTicketAction";
import getProjectTickets from "./getProjectTicketsAction";
const faker = require("@faker-js/faker");

const prisma = new PrismaClient();
afterAll(() => {
  return expect(prisma.$disconnect()).resolves;
});

describe("project tickets action - unit", () => {
  it("get ticket from an existing project", async () => {
    const name = faker.git.commitMessage();
    const description = faker.random.words(10);
    const createdAt = faker.date.recent();

    const savedProject = await createProjectAction({
      prisma,
      name: faker.internet.domainName(),
      description: faker.random.words(10),
      createdAt: faker.date.recent(),
      estimateEndAt: faker.date.future(),
    });

    const savedStatus = await createStatusAction({
      prisma,
      name: faker.random.word(),
    });

    const savedAssignee = await createUserAction({
      prisma,
      profilePicture: faker.image.people(500, 500),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

    const projectId = savedProject.id;
    const statusId = savedStatus.id;
    const assigneeId = savedAssignee.id;

    const savedTicket = await createTicketAction({
      prisma,
      name,
      description,
      projectId,
      statusId,
      assigneeId,
      createdAt,
    });

    const projectTickets = await getProjectTickets({
      prisma,
      projectId,
    });

    expect(projectTickets).toBeTruthy();
    expect(projectTickets).toHaveLength(1);
    expect(projectTickets).toEqual(expect.arrayContaining([savedTicket]));
  });

  it("get an empty array from an existing project", async () => {
    const savedProject = await createProjectAction({
      prisma,
      name: faker.internet.domainName(),
      description: faker.random.words(10),
      createdAt: faker.date.recent(),
      estimateEndAt: faker.date.future(),
    });

    const projectId = savedProject.id;

    const projectTickets = await getProjectTickets({
      prisma,
      projectId,
    });

    expect(projectTickets).toBeTruthy();
    expect(projectTickets).toHaveLength(0);
    expect(projectTickets).toEqual([]);
  });

  it("get null from a non-existing project", async () => {
    const projectId = faker.mersenne.rand(100000000, 999999999);

    const projectTickets = await getProjectTickets({
      prisma,
      projectId,
    });

    expect(projectTickets).toBeNull();
  });
});
