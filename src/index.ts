import "reflect-metadata";
import * as tq from "type-graphql";
import { UserResolver } from "./resolvers/UserResolver";
import { ApolloServer } from "apollo-server";
import { DateTimeResolver } from "graphql-scalars";
import { GraphQLScalarType } from "graphql";

const app = async () => {
  const schema = await tq.buildSchema({
    resolvers: [UserResolver],
    scalarsMap: [{ type: GraphQLScalarType, scalar: DateTimeResolver }],
  });

  new ApolloServer({
    schema,
    context: ({ req }: { req: any }) => {
      const token = req.headers.authorization;

      return { token: token };
    },
  }).listen({ port: 4000 }, () =>
    console.log(`
🚀 Server ready at: http://localhost:4000`)
  );
};

app();
