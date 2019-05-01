const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const port = process.env.PORT;

app.use(cors);

app.listen(port, function() {
  // eslint-disable-next-line no-console
  console.log(`CORS-enabled web server listening on port ${port}`);
});
