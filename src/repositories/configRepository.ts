import { PrismaClient } from "@prisma/client";
import createRoleAction from "../actions/createRoleAction";
import createTicketAction from "../actions/createTicketAction";
import commentService from "../services/commentService";
import mediaService from "../services/mediaService";
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
      name: "Administrateur",
    });

    await createRoleAction({
      name: "Membre",
    });

    const savedProject = await projectService.create({
      name: faker.internet.domainName(),
      description: faker.random.words(5),
      createdAt: faker.date.recent(),
      estimateEndAt: faker.date.future(),
      UsersInProject: {
        roleId: savedRole.id,
        userId: savedUser.id,
      },
    });

    const savedTicket = await createTicketAction({
      name: `${faker.hacker.verb()} ${faker.hacker.adjective()} ${faker.hacker.noun()}`,
      description: faker.random.words(5),
      projectId: savedProject.id,
      statusId: 1,
      assigneeId: savedUser.id,
      createdAt: faker.date.recent(),
    });

    await commentService.create(
      {
        userId: savedUser.id,
        ticketId: savedTicket.id,
        description: faker.random.words(5),
        createdAt: faker.date.recent(),
      },
      savedUser.id
    );

    await mediaService.create(
      {
        name: "test.jpg",
        type: "image/jpeg",
        url: faker.image.imageUrl(),
        createdAt: faker.date.recent(),
        ticketId: 1,
      },
      savedUser.id
    );

    return "[SUCCESS] Base data created";
  },

  /**
   * Flush every table in the database
   * @returns string
   */
  flushDatabase: async (): Promise<string> => {
    const deleteComments = prisma.comment.deleteMany();
    const deleteMedias = prisma.media.deleteMany();
    const deleteTickets = prisma.ticket.deleteMany();
    const deleteProjects = prisma.project.deleteMany();
    const deleteStatus = prisma.status.deleteMany();
    const deleteUsersInProjects = prisma.usersInProjects.deleteMany();
    const deleteRoles = prisma.role.deleteMany();
    const deleteUsers = prisma.user.deleteMany();

    await prisma.$transaction([
      deleteComments,
      deleteMedias,
      deleteTickets,
      deleteStatus,
      deleteUsersInProjects,
      deleteProjects,
      deleteRoles,
      deleteUsers,
    ]);

    return "[SUCCESS] Database flushed";
  },
};

export default configRepository;
