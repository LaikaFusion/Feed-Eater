const express = require("express");
const passport = require("passport");
const cors = require("cors");
const auth = require("./routes/auth");
const graphql = require("./graphql/index")
require('./config/passport.js')(passport);

const app = express();
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use("/auth", auth);

graphql.applyMiddleware({app})

app.use("/", function(req, res) {
  res.send({ error: "Wrong endpoint bucko" });
});



app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000`)
);
