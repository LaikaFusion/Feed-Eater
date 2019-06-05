const express = require("express");
const router = express.Router();
const dbHelpers = require("../db/dbhelpers");
const jwt = require('jsonwebtoken');
const passport = require("passport");

const saltRounds = 10;


router.post("/login",function(req, res, cb) {
  passport.authenticate("local", { session: false },  function(err, user, info) {
    // handle succes or failure

    if (!info) {
      res.json({ error: "failed" });
      return;
    }
    const tokenGen = jwt.sign(
      { id: user.id, email: user.username },
      "ILovePokemon"
    );

    res.json({ ...user, token: tokenGen });
  })(req, res, cb);
});

router.post("/adduser", async function(req, res) {
  if (!req.body.username || !req.body.password) {
    res.status(400).json({ errorMessage: "Invalid body" });
  }

  bcrypt.hash(req.body.password, saltRounds, async function(err, hash) {
    console.log(err);
    try {
      const results = await dbhelpers.addUser(req.body.username, hash);
      res.send(results);
    } catch (err) {
      res.json({ error: err });
    }
  });
});

module.exports = router;
