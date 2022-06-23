const faker = require("@faker-js/faker");
import { ApolloServer } from "apollo-server";
import configService from "../../services/configService";
import { startTestServer } from "../setup";

let testServer: ApolloServer;

beforeAll(async () => {
  testServer = await startTestServer();
  await configService.createBaseData();
});

describe("comment resolver", () => {
  it("create a comment", async () => {
    const result = await testServer.executeOperation({
      query: `
      mutation Mutation($commentInput: CommentInput! ,$userId: Float!) {
        createComment(commentInput: $commentInput, userId: $userId) {
          id
          description
          createdAt
          ticketId
          userId
        }
      }
    `,
      variables: {
        commentInput: {
          description: faker.random.words(5),
          createdAt: faker.date.recent().toString(),
          ticketId: 1,
          userId: 1,
        },
        userId: 1,
      },
    });

    expect(result.errors).toBeUndefined();
    expect(result.data?.createComment).toMatchObject({
      id: expect.any(String),
      description: expect.any(String),
      createdAt: expect.any(String),
      ticketId: expect.any(Number),
      userId: expect.any(Number),
    });
  });
});
