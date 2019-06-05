const express = require("express");
const passport = require("passport");
const { ApolloServer, gql } = require("apollo-server-express");
const cors = require("cors");
const auth = require("./routes/auth");
require('./config/passport.js')(passport);

const app = express();
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use("/auth", auth);

app.use("/", function(req, res) {
  console.log(req);
  res.send({ error: "Wrong endpoint bucko" });
});

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000`)
);
