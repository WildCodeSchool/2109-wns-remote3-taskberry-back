const faker = require("@faker-js/faker");
import { ApolloServer } from "apollo-server";
import configService from "../../services/configService";
import { startTestServer } from "../setup";

let testServer: ApolloServer;

beforeAll(async () => {
  testServer = await startTestServer();
  await configService.createBaseData();
});

describe("project resolver", () => {
  it("create a project", async () => {
    const result = await testServer.executeOperation({
      query: `
    mutation Mutation($projectInput: ProjectInput!) {
      createProject(projectInput: $projectInput) {
        name
        description
        createdAt
        estimateEndAt
      }
    }
  `,
      variables: {
        projectInput: {
          name: faker.internet.domainName(),
          description: faker.random.words(10),
          createdAt: faker.date.recent().toString(),
          estimateEndAt: faker.date.future().toString(),
          UsersInProject: {
            userId: 1,
            roleId: 1,
          },
        },
      },
    });

    expect(result.errors).toBeUndefined();
    expect(result.data?.createProject).toMatchObject({
      name: expect.any(String),
      description: expect.any(String),
      createdAt: expect.any(String),
      estimateEndAt: expect.any(String),
    });
  });
});
