import { PrismaClient } from "@prisma/client";
import createUserAction from "../actions/createUserAction";
import createProjectAction from "../actions/createProjectAction";
import createStatusAction from "../actions/createStatusAction";
import ticketService from "./ticketsService";
import createTicketAction from "../actions/createTicketAction";
import createMediaAction from "../actions/createMediaAction";
import mediaService from "./mediaService";
const faker = require("@faker-js/faker");

const prisma = new PrismaClient();

afterAll(() => {
  return expect(prisma.$disconnect()).resolves;
});

describe("mediaService", () => {
  it("creates new media correctly", async () => {
    // create a user, role, project, status, ticket and media
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

    const name = `${faker.hacker.verb()} ${faker.hacker.adjective()} ${faker.hacker.noun()}`;
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

    const mediaName = "test.jpg";
    const mediaType = "image/jpeg";
    const mediaUrl = faker.image.imageUrl();

    const savedMedia = await mediaService.create(
      {
        name: mediaName,
        type: mediaType,
        url: mediaUrl,
        createdAt: createdAt,
        ticketId: savedTicket.id,
      },
      savedUser.id
    );

    expect(savedMedia.name).toBe(mediaName);
    expect(savedMedia.type).toBe(mediaType);
    expect(savedMedia.url).toBe(mediaUrl);
    expect(savedMedia.ticketId).toBe(savedTicket.id);
  });

  it("delete a media correctly", async () => {
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

    const name = `${faker.hacker.verb()} ${faker.hacker.adjective()} ${faker.hacker.noun()}`;
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

    const mediaName = "test.jpg";
    const mediaType = "image/jpeg";
    const mediaUrl = faker.image.imageUrl();

    const savedMedia = await mediaService.create(
      {
        name: mediaName,
        type: mediaType,
        url: mediaUrl,
        createdAt: createdAt,
        ticketId: savedTicket.id,
      },
      savedUser.id
    );

    await mediaService.delete(savedMedia.id, savedUser.id);

    const deletedMedia = await prisma.media.findUnique({
      where: { id: savedMedia.id },
    });

    expect(deletedMedia).toBeNull();
  });

  it("get ticket media correctly", async () => {
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

    const name = `${faker.hacker.verb()} ${faker.hacker.adjective()} ${faker.hacker.noun()}`;
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

    await createMediaAction({
      name: "test.jpg",
      type: "image/jpeg",
      url: faker.image.imageUrl(),
      createdAt: createdAt,
      ticketId: savedTicket.id,
    });
    await createMediaAction({
      name: "test2.jpg",
      type: "image/jpeg",
      url: faker.image.imageUrl(),
      createdAt: createdAt,
      ticketId: savedTicket.id,
    });

    const ticketMedia = await mediaService.getTicketMedia(
      savedTicket.id,
      savedUser.id
    );

    expect(ticketMedia).toBeTruthy();
    expect(ticketMedia).toHaveLength(2);
  });
});
