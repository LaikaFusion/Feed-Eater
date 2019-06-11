const { ApolloServer, gql } = require("apollo-server-express");
const passport = require("passport");
const dbHelpers = require("../db/dbhelpers");
const jwt = require("jsonwebtoken");

const books = [
  {
    title: "Harry Potter and the Chamber of Secrets",
    author: "J.K. Rowling"
  },
  {
    title: "Jurassic Park",
    author: "Michael Crichton"
  }
];

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  # This "Book" type can be used in other type declarations.
  type Book {
    title: String
    author: String
  }

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    books: [Book],
    id: ID
  }

  type Mutation{
    addServer(URL:String): String
  }
`;

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
  Query: {
    books: (obj, args, context, info) => {return books},
    id: (obj, args, context, info) => {return context.id}
  },
  Mutation:{
    addServer: async (obj, args, context, info)=>{return await dbHelpers.addRssFeed( args.URL);}
  }
};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
module.exports = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  context: async ({ req }) => {
    try {
      // get the user token from the headers
      const token = req.headers.authorization || "";

      if(token===""){
        throw new Error("No auth in header")
      }
      const decoded = jwt.verify(token, 'ILovePokemon');
      // try to retrieve a user with the token
      const id = decoded.id
      // optionally block the user
      // we could also check user roles/permissions here
    

      // add the user to the context
      return { id };

      
      // return { user };
    } catch (err) {
      throw new Error("401: User is not authenticated");
    }
  }
});
