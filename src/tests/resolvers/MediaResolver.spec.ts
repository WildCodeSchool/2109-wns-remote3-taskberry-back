const faker = require("@faker-js/faker");
import { ApolloServer } from "apollo-server";
import configService from "../../services/configService";
import { startTestServer } from "../setup";

let testServer: ApolloServer;

beforeAll(async () => {
  testServer = await startTestServer();
  await configService.createBaseData();
});

describe("media resolver", () => {
  it("create a media", async () => {
    const result = await testServer.executeOperation({
      query: `
      mutation Mutation($mediaInput: MediaInput!, $userId: Float!) {
        createMedia(mediaInput: $mediaInput, userId: $userId) {
          id
          name
          type
          url
          createdAt
          ticketId
        }
      }
    `,
      variables: {
        mediaInput: {
          name: "test.jpg",
          type: "image/jpeg",
          ticketId: 1,
          createdAt: faker.date.recent().toString(),
          url: faker.image.imageUrl(),
        },
        userId: 1,
      },
    });

    expect(result.errors).toBeUndefined();
    expect(result.data?.createMedia).toMatchObject({
      id: expect.any(String),
      name: expect.any(String),
      type: expect.any(String),
      url: expect.any(String),
      createdAt: expect.any(String),
      ticketId: expect.any(Number),
    });
  });

  it("delete a media", async () => {
    const result = await testServer.executeOperation({
      query: `
      mutation Mutation($mediaId: Float!, $userId: Float!) {
        deleteMedia(mediaId: $mediaId, userId: $userId)
      }
    `,
      variables: {
        mediaId: 1,
        userId: 1,
      },
    });

    expect(result.errors).toBeUndefined();
    expect(result.data?.deleteMedia).toBe(1);
  });
});