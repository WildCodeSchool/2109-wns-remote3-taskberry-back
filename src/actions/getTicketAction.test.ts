import createTicketAction from "./createTicketAction";
import { PrismaClient } from "@prisma/client";
import createProjectAction from "./createProjectAction";
import createStatusAction from "./createStatusAction";
import createUserAction from "./createUserAction";
import getTicketAction from "./getTicketAction";
const faker = require("@faker-js/faker");

const prisma = new PrismaClient();
afterAll(() => {
  return expect(prisma.$disconnect()).resolves;
});

describe("get ticket action - unit", () => {
  it("get a ticket by id correctly", async () => {
    const name = faker.git.commitMessage();
    const description = faker.random.words(10);
    const createdAt = faker.date.recent();

    const savedProject = await createProjectAction({
      name: faker.internet.domainName(),
      description: faker.random.words(10),
      createdAt: faker.date.recent(),
      estimateEndAt: faker.date.future(),
      userId: 1,
    });

    const savedStatus = await createStatusAction({
      name: faker.random.word(),
    });

    const savedAssignee = await createUserAction({
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
      name,
      description,
      projectId,
      statusId,
      assigneeId,
      createdAt,
    });

    await getTicketAction({
      id: savedTicket.id,
    });

    const getTicket = await prisma.ticket.findUnique({
      where: { id: savedTicket.id },
    });

    expect(getTicket).toBeTruthy();
  });
});
