import createTicketAction from "./createTicketAction";
import { PrismaClient } from "@prisma/client";
import createProjectAction from "./createProjectAction";
import createStatusAction from "./createStatusAction";
import createUserAction from "./createUserAction";
import updateTicketAction from "./updateTicketAction";
const faker = require("@faker-js/faker");

const prisma = new PrismaClient();
afterAll(() => {
  return expect(prisma.$disconnect()).resolves;
});

describe("update ticket action - unit", () => {
  it("updated a ticket correctly", async () => {
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

    const name = `${faker.hacker.verb()} ${faker.hacker.adjective()} ${faker.hacker.noun()}`;
    const description = faker.random.words(5);
    const projectId = savedProject.id;
    const statusId = savedStatus.id;
    const assigneeId = savedAssignee.id;
    const createdAt = faker.date.recent();

    const savedTicket = await createTicketAction({
      name,
      description,
      projectId,
      statusId,
      assigneeId,
      createdAt,
    });

    const ticketUpdated = await updateTicketAction({
      id: savedTicket.id,
      name: `${faker.hacker.verb()} ${faker.hacker.adjective()} ${faker.hacker.noun()}`,
      description: faker.random.words(15),
    });

    const updatedTicket = await prisma.ticket.findUnique({
      where: { id: savedTicket.id },
    });

    expect(updatedTicket?.description).toEqual(ticketUpdated.description);
    expect(updatedTicket?.name).toEqual(ticketUpdated.name);
  });
});
