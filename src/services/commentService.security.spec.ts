import { PrismaClient } from "@prisma/client";
import createUserAction from "../actions/createUserAction";
import createProjectAction from "../actions/createProjectAction";
import createStatusAction from "../actions/createStatusAction";
import createTicketAction from "../actions/createTicketAction";
import createCommentAction from "../actions/createCommentAction";
import commentService from "./commentService";
const faker = require("@faker-js/faker");

const prisma = new PrismaClient();

afterAll(() => {
  return expect(prisma.$disconnect()).resolves;
});

describe("commentService - security", () => {
  it("throw an error if non-member user trying to get a comment", async () => {
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

    const savedProject = await createProjectAction({
      name: faker.internet.domainName(),
      description: faker.random.words(5),
      createdAt: faker.date.recent(),
      estimateEndAt: faker.date.future(),
      userId: savedUser1.id,
    });

    const savedStatus = await createStatusAction({
      name: faker.random.word(),
    });

    const name = `${faker.hacker.verb()} ${faker.hacker.adjective()} ${faker.hacker.noun()}`;
    const description = faker.random.words(5);
    const createdAt = faker.date.recent();

    const savedTicket = await createTicketAction({
      name,
      description,
      projectId: savedProject.id,
      statusId: savedStatus.id,
      assigneeId: savedUser1.id,
      createdAt,
    });

    const commentsCount = 2;
    let createdComments = [];
    for (let i = 0; i < commentsCount; i++) {
      const newComment = await createCommentAction({
        description,
        createdAt: faker.date.recent(),
        ticketId: savedTicket.id,
        userId: savedUser1.id,
      });
      createdComments.push(newComment);
    }

    const commentPromise = commentService.getTicketComments(
      savedTicket.id,
      savedUser2.id
    );

    await expect(commentPromise).rejects.toThrow(
      "User is not a member of the project"
    );
  });

  it("throw an error if non-member user trying to create a comment", async () => {
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

    const savedProject = await createProjectAction({
      name: faker.internet.domainName(),
      description: faker.random.words(5),
      createdAt: faker.date.recent(),
      estimateEndAt: faker.date.future(),
      userId: savedUser1.id,
    });

    const savedStatus = await createStatusAction({
      name: faker.random.word(),
    });

    const name = `${faker.hacker.verb()} ${faker.hacker.adjective()} ${faker.hacker.noun()}`;
    const description = faker.random.words(5);
    const createdAt = faker.date.recent();

    const savedTicket = await createTicketAction({
      name,
      description,
      projectId: savedProject.id,
      statusId: savedStatus.id,
      assigneeId: savedUser1.id,
      createdAt,
    });

    const commentPromise = commentService.create(
      {
        userId: savedUser1.id,
        ticketId: savedTicket.id,
        description: faker.random.words(5),
        createdAt: faker.date.recent(),
      },
      savedUser2.id
    );

    await expect(commentPromise).rejects.toThrow(
      "User is not a member of the project"
    );
  });
});
