import createTicketAction from "./createTicketAction";
import { PrismaClient } from "@prisma/client";
import createProjectAction from "./createProjectAction";
import createStatusAction from "./createStatusAction";
import createUserAction from "./createUserAction";
import deleteTicketAction from "./deleteTicketAction";
const faker = require("@faker-js/faker");

const prisma = new PrismaClient();
afterAll(() => {
  return expect(prisma.$disconnect()).resolves;
});

describe("delete ticket action - unit", () => {
  it("delete a ticket correctly", async () => {
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

    await deleteTicketAction({
      prisma,
      id: savedTicket.id,
    });

    const deletedTicket = await prisma.ticket.findUnique({
      where: { id: savedTicket.id },
    });

    expect(deletedTicket).toBeNull();
  });
});
