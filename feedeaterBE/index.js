const express = require("express");
const passport = require("passport");
var Strategy = require("passport-local").Strategy;
const bodyParser = require("body-parser");
const { ApolloServer, gql } = require("apollo-server-express");

const HEADER_NAME = "authorization";

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    me: User
  }

  type User {
    id: ID!
    username: String!
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    me: (root, args, context) => context.currentUser
  },
  User: {
    id: user => user._id,
    username: user => user.username
  }
};

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    let authToken = null;
    let currentUser = null;

    try {
      authToken = req.headers[HEADER_NAME];

      if (authToken) {
        currentUser = authToken;
        console.log(authToken);
      }
    } catch (e) {
      console.warn(`Unable to authenticate using auth token: ${authToken}`);
    }

    return {
      authToken,
      currentUser
    };
  }
});
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
