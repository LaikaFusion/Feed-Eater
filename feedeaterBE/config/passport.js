const express = require("express");
const passport = require("passport");
const Strategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dbHelpers = require("../db/dbhelpers");

module.exports = function(passport){passport.use(
  new Strategy(async function(username, password, cb) {
    //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
    let success = false;
    let results = null;
    try {
     

      results = await dbHelpers.findUser(username);
      bcrypt
        .compare(password, results.hash)
        .then(function(res) {
          console.log(res);
          success = res;
          return cb(null, { user: results.username, id: results.id }, success);
        })
        .catch(function(err) {
          console.log(err);
          return cb(null, results, success);
        });
    } catch (err) {
      console.log("Find user error");
      return cb(null, results, success);
    }

    // return UserModel.findOne({email, password})
    //    .then(user => {
    //        if (!user) {
    //            return cb(null, false, {message: 'Incorrect email or password.'});
    //        }
    //        return cb(null, user, {message: 'Logged In Successfully'});
    //   })
    //   .catch(err => cb(err));
  })
);

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "ILovePokemon"
    },
    function(jwtPayload, cb) {
      //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
      return User.findById(jwtPayload.id)
        .then(user => {
          return cb(null, user);
        })
        .catch(err => {
          return cb(err);
        });
    }
  )
);
}

