const express = require("express");
const passport = require("passport");
var Strategy = require("passport-local").Strategy;
const bodyParser = require("body-parser");
const { ApolloServer, gql } = require("apollo-server-express");


const app = express();



app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000`)
);
