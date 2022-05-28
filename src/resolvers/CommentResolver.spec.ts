import { gql } from "apollo-server";
import { PrismaClient } from "@prisma/client";
import { ApolloServer } from "apollo-server";
const faker = require("@faker-js/faker");

const prisma = new PrismaClient();
export let server: ApolloServer;

afterAll(() => {
  return expect(prisma.$disconnect()).resolves;
});

describe("comment resolver", () => {
  describe("create comment mutation", () => {
    it("add new comment into the db", async () => {
      const addCommentMutation = gql`
        mutation Mutation($commentInput: CommentInput!) {
          createComment(commentInput: $commentInput) {
            id
            description
            createdAt
            ticketId
            userId
          }
        }
      `;
    });
    const variables = {
      projectInput: {
        description: faker.random.words(5),
        createdAt: faker.date.recent(),
        estimateEndAt: faker.date.future(),
        ticketId: 1,
        userId: 1,
      },
    };
  });
});
