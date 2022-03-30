import { PrismaClient } from "@prisma/client";
import createRoleAction from "../actions/createRoleAction";
import createTicketAction from "../actions/createTicketAction";
import commentService from "../services/commentService";
import projectService from "../services/projectsService";
import userService from "../services/userService";

const prisma = new PrismaClient();
const faker = require("@faker-js/faker");

const configRepository = {
  /**
   * Inserts data in all tables when the database has been flushed
   * @returns string
   */
  createBaseData: async (): Promise<string> => {
    const savedUser = await userService.createUser({
      profilePicture: faker.image.people(500, 500),
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@gmail.com",
      password: "johndoe",
    });

    await prisma.status.createMany({
      data: [
        {
          id: 1,
          name: "À faire",
        },
        {
          id: 2,
          name: "En cours",
        },
        {
          id: 3,
          name: "Review",
        },
        {
          id: 4,
          name: "Terminé",
        },
      ],
    });

    const savedRole = await createRoleAction({
      prisma: prisma,
      name: "Administrateur",
    });

    const savedProject = await projectService.create({
      name: faker.internet.domainName(),
      description: faker.random.words(10),
      createdAt: faker.date.recent(),
      estimateEndAt: faker.date.future(),
      UsersInProject: {
        roleId: savedRole.id,
        userId: savedUser.id,
      },
    });

    const savedTicket = await createTicketAction({
      prisma,
      name: faker.git.commitMessage(),
      description: faker.random.words(10),
      projectId: savedProject.id,
      statusId: 1,
      assigneeId: savedUser.id,
      createdAt: faker.date.recent(),
    });

    await commentService.create({
      userId: savedUser.id,
      ticketId: savedTicket.id,
      description: faker.random.words(10),
      createdAt: faker.date.recent(),
    });

    return "[SUCCESS] Base data created";
  },
};

export default configRepository;
