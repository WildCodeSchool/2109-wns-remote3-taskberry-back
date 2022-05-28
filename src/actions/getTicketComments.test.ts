import createTicketAction from "./createTicketAction";
import { PrismaClient } from "@prisma/client";
import createProjectAction from "./createProjectAction";
import createStatusAction from "./createStatusAction";
import createUserAction from "./createUserAction";
import createCommentAction from "./createCommentAction";
import getTicketCommentsAction from "./getTicketComments";
const faker = require("@faker-js/faker");

const prisma = new PrismaClient();
afterAll(() => {
  return expect(prisma.$disconnect()).resolves;
});

describe("get ticket comments action - unit", () => {
  it("get a ticket comments by id correctly", async () => {
    const name = `${faker.hacker.verb()} ${faker.hacker.adjective()} ${faker.hacker.noun()}`;
    const description = faker.random.words(5);
    const createdAt = faker.date.recent();

    const savedProject = await createProjectAction({
      name: faker.internet.domainName(),
      description: faker.random.words(5),
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

    const commentCount = 5;

    for (let i = 0; i < commentCount; i++) {
      await createCommentAction({
        description: faker.random.words(5),
        createdAt: faker.date.recent(),
        userId: savedAssignee.id,
        ticketId: savedTicket.id,
      });
    }

    const getComments = await getTicketCommentsAction({
      id: savedTicket.id,
    });

    expect(getComments).toBeTruthy();
    expect(getComments).toHaveLength(5);
  });
});
