const { ApolloServer } = require("apollo-server");
import resolvers from "./resolvers";
import typeDefs from "./graphql/schema";

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }: { url: string }) => {
  console.log(`🚀  Server ready at ${url}`);
});
