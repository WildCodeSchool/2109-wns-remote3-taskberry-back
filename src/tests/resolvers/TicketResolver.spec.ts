const faker = require("@faker-js/faker");
import { ApolloServer } from "apollo-server";
import configService from "../../services/configService";
import { startTestServer } from "../setup";

let testServer: ApolloServer;

beforeAll(async () => {
  testServer = await startTestServer();
  await configService.createBaseData();
});

describe("ticket resolver", () => {
  it("create a ticket", async () => {
    const result = await testServer.executeOperation({
      query: `
      mutation CreateTicket($ticketInput: TicketInput!) {
        createTicket(ticketInput: $ticketInput) {
          name
          description
          createdAt
          projectId
          assigneeId
          statusId
        }
      }
    `,
      variables: {
        ticketInput: {
          name: faker.git.commitMessage(),
          createdAt: faker.date.recent().toString(),
          projectId: 1,
          statusId: 1,
          assigneeId: 1,
        },
      },
    });

    expect(result.errors).toBeUndefined();
    expect(result.data?.createTicket).toMatchObject({
      name: expect.any(String),
      description: null,
      createdAt: expect.any(String),
      projectId: expect.any(Number),
      statusId: expect.any(Number),
      assigneeId: expect.any(Number),
    });
  });

  it("retrieve a created ticket", async () => {
    const result = await testServer.executeOperation({
      query: `
        query Query($ticketId: Float!, $userId: Float!) {
          getTicket(ticketId: $ticketId, userId: $userId) {
            id
            name
            description
            createdAt
            finishedAt
            projectId
            statusId
            assigneeId
          }
        }
      `,
      variables: {
        ticketId: 1,
        userId: 1,
      },
    });

    expect(result.errors).toBeUndefined();
    expect(result.data?.getTicket).toMatchObject({
      id: expect.any(String),
      name: expect.any(String),
      description: expect.any(String),
      createdAt: expect.any(String),
      finishedAt: null,
      projectId: expect.any(Number),
      statusId: expect.any(Number),
      assigneeId: expect.any(Number),
    });
  });

  it("delete a ticket", async () => {
    const result = await testServer.executeOperation({
      query: `
      mutation Mutation($ticketId: Float!, $userId: Float!) {
        deleteTicket(ticketId: $ticketId, userId: $userId)
      }
    `,
      variables: {
        ticketId: 1,
        userId: 1,
      },
    });

    expect(result.errors).toBeUndefined();
    expect(result.data?.deleteTicket).toBe(1);
  });

  it("get project tickets", async () => {
    const result = await testServer.executeOperation({
      query: `
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
    `,
      variables: {
        projectId: 1,
      },
    });

    expect(result.errors).toBeUndefined();
    expect(result.data?.getProjectTickets).toBeTruthy();
    expect(result.data?.getProjectTickets).toBeInstanceOf(Array);
  });
});
