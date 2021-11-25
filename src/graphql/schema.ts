const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: String
    profilePicture: String
    firstName: String
    lastName: String
    email: String
  }

  type Query {
    users: [User]
  }

  type Mutation {
    newUser(
      profilePicture: String
      firstName: String
      lastName: String
      email: String
      password: String
    ): User
  }
`;

export default typeDefs;
