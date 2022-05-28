import { gql } from "apollo-server";
import { PrismaClient } from "@prisma/client";
import { ApolloServer } from "apollo-server";
const faker = require("@faker-js/faker");

const prisma = new PrismaClient();
export let server: ApolloServer;

afterAll(() => {
  return expect(prisma.$disconnect()).resolves;
});

describe("project resolver", () => {
  describe("create project mutation", () => {
    it("add new project into the db", async () => {
      const addProjectMutation = gql`
        mutation Mutation($projectInput: ProjectInput!) {
          createProject(projectInput: $projectInput) {
            name
            description
            createdAt
            estimateEndAt
          }
        }
      `;
    });
    const variables = {
      projectInput: {
        name: faker.internet.domainName(),
        description: faker.random.words(5),
        createdAt: faker.date.recent(),
        estimateEndAt: faker.date.future(),
        UsersInProject: {
          userId: 1,
          roleId: 1,
        },
      },
    };
  });
});
