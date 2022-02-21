import { PrismaClient } from "@prisma/client";
import createUserAction from "../actions/createUserAction";
import createProjectAction from "../actions/createProjectAction";
import createStatusAction from "../actions/createStatusAction";
import ticketService from "./ticketsService";
import getProjectTickets from "../actions/getProjectTicketsAction";
import createTicketAction from "../actions/createTicketAction";
const faker = require("@faker-js/faker");

const prisma = new PrismaClient();

afterAll(() => {
  return expect(prisma.$disconnect()).resolves;
});

describe("ticketService", () => {
  it("creates new ticket correctly", async () => {
    // create a user, role, project, status and ticket
    const savedUser = await createUserAction({
      prisma,
      profilePicture: faker.image.people(500, 500),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

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

    const name = faker.git.commitMessage();
    const description = faker.random.words(10);
    const createdAt = faker.date.recent();

    const savedTicket = await ticketService.create({
      name,
      description,
      projectId: savedProject.id,
      statusId: savedStatus.id,
      assigneeId: savedUser.id,
      createdAt,
    });

    expect(savedTicket.name).toBe(name);
    expect(savedTicket.description).toBe(description);
    expect(savedTicket.projectId).toBe(savedProject.id);
    expect(savedTicket.statusId).toBe(savedStatus.id);
    expect(savedTicket.assigneeId).toBe(savedUser.id);
  });

  it("delete a ticket correctly", async () => {
    const savedUser = await createUserAction({
      prisma,
      profilePicture: faker.image.people(500, 500),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

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

    const name = faker.git.commitMessage();
    const description = faker.random.words(10);
    const createdAt = faker.date.recent();

    const savedTicket = await ticketService.create({
      name,
      description,
      projectId: savedProject.id,
      statusId: savedStatus.id,
      assigneeId: savedUser.id,
      createdAt,
    });

    await ticketService.delete(savedTicket.id);

    const deletedTicket = await prisma.ticket.findUnique({
      where: { id: savedTicket.id },
    });

    expect(deletedTicket).toBeNull();
  });

  it("get project tickets correctly", async () => {
    const savedUser = await createUserAction({
      prisma,
      profilePicture: faker.image.people(500, 500),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

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

    const name = faker.git.commitMessage();
    const description = faker.random.words(10);
    const createdAt = faker.date.recent();

    const savedTicket = await createTicketAction({
      prisma,
      name,
      description,
      projectId: savedProject.id,
      statusId: savedStatus.id,
      assigneeId: savedUser.id,
      createdAt,
    });

    const projectTickets = await ticketService.getProjectTickets(
      savedProject.id
    );

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
    const projectTickets = await ticketService.getProjectTickets(projectId);

    expect(projectTickets).toBeTruthy();
    expect(projectTickets).toHaveLength(0);
    expect(projectTickets).toEqual([]);
  });

  it("throw an error from a non-existing project", async () => {
    const projectId = faker.mersenne.rand(100000000, 999999999);
    const projectTicketsPromise = ticketService.getProjectTickets(projectId);

    await expect(projectTicketsPromise).rejects.toThrow(
      "Project doesn't exist"
    );
  });
});
