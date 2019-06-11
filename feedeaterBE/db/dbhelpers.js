const knex = require("knex");
const knexConfig = require("../knexfile.js");
const db = knex(knexConfig.development);

module.exports = {
  addUser: (user,hashpw) => {
    return db("users").insert({username:user,hash:hashpw });
  },
  findUser:  (user) => {
    return db("users")
    .where({username: user}).first()
  },
  addRssFeed: (url) =>{
    return db('feeds').select()
        .where('url', url)
    .then(function(rows) {
        if (rows.length===0) {
            // no matching records found
            return db('feeds').insert({'url': url}).then((id)=>{return id[0]})
        } else {
            return rows[0].feedid
        }
    })
    .catch(function(ex) {
       console.log(ex)
    })
  }
};