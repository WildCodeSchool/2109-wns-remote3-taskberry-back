import { gql } from "apollo-server";
import { PrismaClient } from "@prisma/client";
import { ApolloServer } from "apollo-server";
const faker = require("@faker-js/faker");

const prisma = new PrismaClient();
export let server: ApolloServer;

afterAll(() => {
  return expect(prisma.$disconnect()).resolves;
});

describe("ticket resolver", () => {
  describe("create ticket mutation", () => {
    it("add a new ticket into the db", async () => {
      const addTicketMutation = gql`
        mutation CreateTicket($ticketInput: TicketInput!) {
          createTicket(ticketInput: $ticketInput) {
            name
            createdAt
            projectId
            assigneeId
            statusId
            description
          }
        }
      `;
    });
    const variables = {
      ticketInput: {
        name: faker.git.commitMessage(),
        createdAt: faker.date.recent(),
        projectId: 1,
        statusId: 1,
        assigneeId: 1,
      },
    };
  });

  describe("delete ticket mutation", () => {
    it("deletes a ticket into the db", async () => {
      const addProjectMutation = gql`
        mutation CreateTicket($ticketId: Float!) {
          deleteTicket(ticketId: $ticketId)
        }
      `;
    });
    const variables = {
      ticketId: 1,
    };
  });

  describe("get project tickets query", () => {
    it("retrieve tickets from a project in db", async () => {
      const projectTicketsQuery = gql`
        query Query($projectId: Float!) {
          getProjectTickets(projectId: $projectId) {
            name
            createdAt
            description
            projectId
            statusId
            assigneeId
            finishedAt
          }
        }
      `;
    });
    const variables = {
      projectId: 1,
    };
  });
});
