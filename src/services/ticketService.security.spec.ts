import { PrismaClient } from "@prisma/client";
import createUserAction from "../actions/createUserAction";
import createProjectAction from "../actions/createProjectAction";
import createStatusAction from "../actions/createStatusAction";
import ticketService from "./ticketsService";
import createTicketAction from "../actions/createTicketAction";
const faker = require("@faker-js/faker");

const prisma = new PrismaClient();

afterAll(() => {
  return expect(prisma.$disconnect()).resolves;
});

describe("ticketService - security", () => {
  it("throw an error if trying to get a ticket in another project", async () => {
    const savedUser1 = await createUserAction({
      profilePicture: faker.image.people(500, 500),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

    const savedUser2 = await createUserAction({
      profilePicture: faker.image.people(500, 500),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

    const savedProject1 = await createProjectAction({
      name: faker.internet.domainName(),
      description: faker.random.words(5),
      createdAt: faker.date.recent(),
      estimateEndAt: faker.date.future(),
      userId: savedUser1.id,
    });

    const savedProject2 = await createProjectAction({
      name: faker.internet.domainName(),
      description: faker.random.words(5),
      createdAt: faker.date.recent(),
      estimateEndAt: faker.date.future(),
      userId: savedUser2.id,
    });

    const savedStatus = await createStatusAction({
      name: faker.random.word(),
    });

    const createdAt = faker.date.recent();

    await createTicketAction({
      name: faker.git.commitMessage(),
      description: faker.random.words(5),
      projectId: savedProject1.id,
      statusId: savedStatus.id,
      assigneeId: savedUser1.id,
      createdAt,
    });

    const savedTicket2 = await createTicketAction({
      name: faker.git.commitMessage(),
      description: faker.random.words(5),
      projectId: savedProject2.id,
      statusId: savedStatus.id,
      assigneeId: savedUser2.id,
      createdAt,
    });

    const ticketPromise = ticketService.getTicket(
      savedTicket2.id,
      savedUser1.id
    );

    await expect(ticketPromise).rejects.toThrow(
      "User is not a member of the project"
    );
  });

  it("throw an error if trying to update a ticket in another project", async () => {
    const savedUser1 = await createUserAction({
      profilePicture: faker.image.people(500, 500),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

    const savedUser2 = await createUserAction({
      profilePicture: faker.image.people(500, 500),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

    const savedProject1 = await createProjectAction({
      name: faker.internet.domainName(),
      description: faker.random.words(5),
      createdAt: faker.date.recent(),
      estimateEndAt: faker.date.future(),
      userId: savedUser1.id,
    });

    const savedProject2 = await createProjectAction({
      name: faker.internet.domainName(),
      description: faker.random.words(5),
      createdAt: faker.date.recent(),
      estimateEndAt: faker.date.future(),
      userId: savedUser2.id,
    });

    const savedStatus = await createStatusAction({
      name: faker.random.word(),
    });

    const createdAt = faker.date.recent();

    await createTicketAction({
      name: faker.git.commitMessage(),
      description: faker.random.words(5),
      projectId: savedProject1.id,
      statusId: savedStatus.id,
      assigneeId: savedUser1.id,
      createdAt,
    });

    const savedTicket2 = await createTicketAction({
      name: faker.git.commitMessage(),
      description: faker.random.words(5),
      projectId: savedProject2.id,
      statusId: savedStatus.id,
      assigneeId: savedUser2.id,
      createdAt,
    });

    const ticketPromise = ticketService.getTicket(
      savedTicket2.id,
      savedUser1.id
    );

    await expect(ticketPromise).rejects.toThrow(
      "User is not a member of the project"
    );
  });
});
