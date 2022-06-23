import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { buildTypeDefsAndResolvers } from "type-graphql";

import { UserResolver } from "../resolvers/UserResolver";
import { ProjectResolver } from "../resolvers/ProjectResolver";
import { TicketResolver } from "../resolvers/TicketResolver";
import { ConfigResolver } from "../resolvers/ConfigResolver";
import { CommentResolver } from "../resolvers/CommentResolver";
import { MediaResolver } from "../resolvers/MediaResolver";

export const startTestServer = async () => {
  const { typeDefs, resolvers } = await buildTypeDefsAndResolvers({
    resolvers: [
      UserResolver,
      ProjectResolver,
      TicketResolver,
      ConfigResolver,
      CommentResolver,
      MediaResolver,
    ],
  });

  const schema = makeExecutableSchema({ typeDefs, resolvers });

  return new ApolloServer({
    schema: schema,
  });
};
