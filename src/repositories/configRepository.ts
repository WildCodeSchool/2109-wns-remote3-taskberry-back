import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const faker = require("@faker-js/faker");

const configRepository = {
  /**
   * Inserts data in all tables when the database has been flushed
   * @returns string
   */
  createBaseData: async (): Promise<string> => {
    /**
     * Creates a base user if none is in the database
     */
    const baseUser = await prisma.user.findUnique({
      where: {
        id: 1,
      },
    });

    let savedUser;
    if (baseUser) {
      savedUser = baseUser;
    } else {
      savedUser = await prisma.user.create({
        data: {
          id: 1,
          profilePicture: faker.image.people(500, 500),
          firstName: "John",
          lastName: "Doe",
          email: "john.doe@gmail.com",
          password:
            "$2a$12$fRE7Bl3FdcFRtJAe2Lzh3e2Bou5hXdKvay60sX.9cd3AgeJN9tAHu",
        },
      });
    }
    if (!savedUser) throw new Error("[ERROR] Base user could not be created");

    /**
     * Creates a base status if none is in the database
     */
    const baseStatus = await prisma.status.findUnique({
      where: {
        id: 1,
      },
    });

    if (!baseStatus) {
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
    }

    /**
     * Creates a base role if none is in the database
     */
    const baseRole = await prisma.role.findUnique({
      where: {
        id: 1,
      },
    });
    const baseMemberRole = await prisma.role.findUnique({
      where: {
        id: 2,
      },
    });

    let savedRole;
    if (baseRole) {
      savedRole = baseRole;
    } else {
      savedRole = await prisma.role.create({
        data: {
          id: 1,
          name: "Administrateur",
        },
      });
    }
    if (!baseMemberRole) {
      await prisma.role.create({
        data: {
          id: 2,
          name: "Membre",
        },
      });
    }
    if (!savedRole) throw new Error("[ERROR] Base role could not be created");

    /**
     * Creates a base project if none is in the database
     */
    const baseProject = await prisma.project.findUnique({
      where: {
        id: 1,
      },
    });

    let savedProject;
    if (baseProject) {
      savedProject = baseProject;
    } else {
      savedProject = await prisma.project.create({
        data: {
          id: 1,
          name: faker.internet.domainName(),
          description: faker.random.words(10),
          createdAt: faker.date.recent(),
          estimateEndAt: faker.date.future(),
        },
      });

      await prisma.usersInProjects.create({
        data: {
          userId: 1,
          projectId: 1,
          roleId: 1,
        },
      });
    }
    if (!savedProject)
      throw new Error("[ERROR] Base project could not be created");

    /**
     * Creates a base ticket if none is in the database
     */
    const baseTicket = await prisma.ticket.findUnique({
      where: {
        id: 1,
      },
    });

    let savedTicket;
    if (baseTicket) {
      savedTicket = baseTicket;
    } else {
      savedTicket = await prisma.ticket.create({
        data: {
          id: 1,
          name: faker.git.commitMessage(),
          description: faker.random.words(10),
          projectId: savedProject.id,
          statusId: 1,
          assigneeId: savedUser.id,
          createdAt: faker.date.recent(),
        },
      });
    }
    if (!savedTicket)
      throw new Error("[ERROR] Base ticket could not be created");

    /**
     * Creates a base comment if none is in the database
     */
    const baseComment = await prisma.status.findUnique({
      where: {
        id: 1,
      },
    });

    if (!baseComment) {
      await prisma.comment.create({
        data: {
          id: 1,
          userId: savedUser.id,
          ticketId: savedTicket.id,
          description: faker.random.words(10),
          createdAt: faker.date.recent(),
        },
      });
    }

    /**
     * Creates a base media if none is in the database
     */
    const baseMedia = await prisma.media.findUnique({
      where: {
        id: 1,
      },
    });

    if (!baseMedia) {
      await prisma.media.create({
        data: {
          id: 1,
          name: "test.jpg",
          type: "image/jpeg",
          url: faker.image.imageUrl(),
          createdAt: faker.date.recent(),
          ticketId: savedTicket.id,
        },
      });
    }

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
