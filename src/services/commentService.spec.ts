import { PrismaClient } from "@prisma/client";
import createUserAction from "../actions/createUserAction";
import createProjectAction from "../actions/createProjectAction";
import createStatusAction from "../actions/createStatusAction";
import ticketService from "./ticketsService";
import createTicketAction from "../actions/createTicketAction";
import commentService from "./commentService";
import createCommentAction from "../actions/createCommentAction";
const faker = require("@faker-js/faker");

const prisma = new PrismaClient();

afterAll(() => {
  return expect(prisma.$disconnect()).resolves;
});

describe("commentService", () => {
  it("creates new comment correctly", async () => {
    // create a user, role, project, status, ticket and comment
    const savedUser = await createUserAction({
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
      userId: savedUser.id,
    });

    const savedStatus = await createStatusAction({
      name: faker.random.word(),
    });

    const name = faker.git.commitMessage();
    const description = faker.random.words(5);
    const createdAt = faker.date.recent();

    const savedTicket = await ticketService.create({
      name,
      description,
      projectId: savedProject.id,
      statusId: savedStatus.id,
      assigneeId: savedUser.id,
      createdAt,
    });

    const savedComment: any = await commentService.create({
      description,
      createdAt: faker.date.recent(),
      ticketId: savedTicket.id,
      userId: savedUser.id,
    });

    expect(savedComment.description).toBe(description);
    expect(savedComment.ticketId).toBe(savedTicket.id);
    expect(savedComment.userId).toBe(savedUser.id);
  });

  it("delete a comment correctly", async () => {
    const savedUser = await createUserAction({
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
      userId: savedUser.id,
    });

    const savedStatus = await createStatusAction({
      name: faker.random.word(),
    });

    const name = faker.git.commitMessage();
    const description = faker.random.words(5);
    const createdAt = faker.date.recent();

    const savedTicket = await createTicketAction({
      name,
      description,
      projectId: savedProject.id,
      statusId: savedStatus.id,
      assigneeId: savedUser.id,
      createdAt,
    });

    const savedComment: any = await commentService.create({
      description,
      createdAt,
      ticketId: savedTicket.id,
      userId: savedUser.id,
    });

    await commentService.delete(savedComment.id);

    const deletedComment = await prisma.comment.findUnique({
      where: { id: savedComment.id },
    });

    expect(deletedComment).toBeNull();
  });

  it("get ticket comments correctly", async () => {
    const savedUser = await createUserAction({
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
      userId: savedUser.id,
    });

    const savedStatus = await createStatusAction({
      name: faker.random.word(),
    });

    const name = faker.git.commitMessage();
    const description = faker.random.words(5);
    const createdAt = faker.date.recent();

    const savedTicket = await createTicketAction({
      name,
      description,
      projectId: savedProject.id,
      statusId: savedStatus.id,
      assigneeId: savedUser.id,
      createdAt,
    });

    const commentsCount = 2;
    let createdComments = [];
    for (let i = 0; i < commentsCount; i++) {
      const newComment = await createCommentAction({
        description,
        createdAt: faker.date.recent(),
        ticketId: savedTicket.id,
        userId: savedUser.id,
      });
      createdComments.push(newComment);
    }

    const ticketComments = await commentService.getTicketComments(
      savedTicket.id
    );

    expect(ticketComments).toBeTruthy();
    expect(ticketComments).toHaveLength(2);
  });

  it("throw an error from a non-existing ticket", async () => {
    const ticketId = faker.mersenne.rand(100000000, 999999999);
    const ticketCommentsPromise = commentService.getTicketComments(ticketId);

    await expect(ticketCommentsPromise).rejects.toThrow("Ticket doesn't exist");
  });
});
