import { gql } from "apollo-server";
import { PrismaClient } from "@prisma/client";
import { ApolloServer } from "apollo-server";
const faker = require("@faker-js/faker");

const prisma = new PrismaClient();
export let server: ApolloServer;

afterAll(() => {
  return expect(prisma.$disconnect()).resolves;
});

describe("media resolver", () => {
  describe("create media mutation", () => {
    it("add new media into the db", async () => {
      const addMediaMutation = gql`
        mutation Mutation($mediaInput: MediaInput!) {
          createMedia(mediaInput: $mediaInput) {
            id
          }
        }
      `;
    });
    const variables = {
      mediaInput: {
        name: "test.jpg",
        type: "image/jpeg",
        ticketId: 1,
        createdAt: faker.date.recent(),
        url: faker.image.imageUrl(),
      },
    };
  });

  describe("delete media mutation", () => {
    it("delete a media into the db", async () => {
      const deleteMediaMutation = gql`
        mutation Mutation($mediaId: Float!) {
          deleteMedia(mediaId: $mediaId)
        }
      `;
    });
    const variables = {
      mediaId: 1,
    };
  });
});
