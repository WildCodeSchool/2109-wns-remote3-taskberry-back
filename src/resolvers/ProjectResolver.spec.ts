import { gql } from "apollo-server";
import { PrismaClient } from "@prisma/client";
import { ApolloServer } from "apollo-server";

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
        name: "Projet 1",
        description: "c'est un autre projet",
        createdAt: "02/03/2022",
        estimateEndAt: "02/07/2022",
        UsersInProject: {
          userId: 1,
          roleId: 4,
        },
      },
    };
  });
});
