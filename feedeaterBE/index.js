const express = require("express");
const passport = require("passport");
const Strategy = require("passport-local").Strategy;
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const { ApolloServer, gql } = require("apollo-server-express");
const cors = require('cors');

const dbhelpers = require("./db/dbhelpers");

const app = express();
app.use(cors());
app.use(express.json());
app.use(passport.initialize());


const saltRounds = 10;



passport.use(new Strategy( 
  async function  (username, password, cb) {
  //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
  let success = false;
  let results = null;
  try {
    // req.body.password = bcrypt.hashSync(req.body.password, 14);
    
    results = await dbhelpers.findUser(username);
    success = true;
    console.log(results)
  } catch (err) {
    console.log('Find user error')
  }
    return cb(null, {user: results},success);

  // return UserModel.findOne({email, password})
  //    .then(user => {
  //        if (!user) {
  //            return cb(null, false, {message: 'Incorrect email or password.'});
  //        }
  //        return cb(null, user, {message: 'Logged In Successfully'});
  //   })
  //   .catch(err => cb(err));
}
));




app.post("/login",function(req, res,cb) {
  passport.authenticate("local", function(err, user, info){

    // handle succes or failure
    
   if(!info){
     res.json({"error":"failed"})
     return
   }
   res.json({...user})
   
  })(req,res,cb); 
  
});

app.post("/adduser", async function(req, res) {
  if (!req.body.username || !req.body.password) {
    res.status(400).json({ errorMessage: "Invalid body" });
  }
  
 
  // console.log(userCheck)

  bcrypt.hash(req.body.password, saltRounds, async function  (err, hash) {
    console.log(err);
    try{
      const results = await dbhelpers.addUser(req.body.username,hash);
      res.send(results)
    }catch(err){
      res.json({"error":err})
    }
    
  });


})

app.use("/", function(req, res) {
  console.log(req)
  res.send({ error: "Wrong endpoint bucko" });
});

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000`)
);
