import { PrismaClient } from "@prisma/client";
import createUserAction from "../actions/createUserAction";
import createProjectAction from "../actions/createProjectAction";
import createStatusAction from "../actions/createStatusAction";
import createMediaAction from "../actions/createMediaAction";
import mediaService from "./mediaService";
import createTicketAction from "../actions/createTicketAction";
import projectService from "./projectsService";
const faker = require("@faker-js/faker");

const prisma = new PrismaClient();

afterAll(() => {
  return expect(prisma.$disconnect()).resolves;
});

describe("mediaService - security", () => {
  it("throw an error if non-member user trying to get a media", async () => {
    // create a user, role, project, status, ticket and media
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

    const mediaName = "test.jpg";
    const mediaType = "image/jpeg";
    const mediaUrl = faker.image.imageUrl();

    await createMediaAction({
      name: mediaName,
      type: mediaType,
      url: mediaUrl,
      createdAt: createdAt,
      ticketId: savedTicket.id,
    });

    const mediaPromise = mediaService.getTicketMedia(
      savedTicket.id,
      savedUser2.id
    );

    await expect(mediaPromise).rejects.toThrow(
      "User is not a member of the project"
    );
  });

  it("throw an error if non-member user trying to create a media", async () => {
    // create a user, role, project, status, ticket and media
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

    const mediaName = "test.jpg";
    const mediaType = "image/jpeg";
    const mediaUrl = faker.image.imageUrl();

    const mediaPromise = mediaService.create(
      {
        name: mediaName,
        type: mediaType,
        url: mediaUrl,
        createdAt: createdAt,
        ticketId: savedTicket.id,
      },
      savedUser2.id
    );

    await expect(mediaPromise).rejects.toThrow(
      "User is not a member of the project"
    );
  });

  it("throw an error if user trying to delete a media is not project admin", async () => {
    // create a user, role, project, status, ticket and media
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

    await projectService.addProjectMember({
      roleId: 2,
      userId: savedUser2.id,
      projectId: savedProject.id,
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

    const mediaName = "test.jpg";
    const mediaType = "image/jpeg";
    const mediaUrl = faker.image.imageUrl();

    const media = await mediaService.create(
      {
        name: mediaName,
        type: mediaType,
        url: mediaUrl,
        createdAt: createdAt,
        ticketId: savedTicket.id,
      },
      savedUser1.id
    );

    const mediaPromise = mediaService.delete(media.id, savedUser2.id);

    await expect(mediaPromise).rejects.toThrow(
      "User is not the project Administrator"
    );
  });
});
