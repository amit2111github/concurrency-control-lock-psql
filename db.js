const {Pool} = require("pg");
const pool = new Pool({
  "host" :"localhost",
  "port": 5432,
  "user":"amit",
  "password" : "password",
  "database" : "atm",
  "max": 20,
  "connectionTimeoutMillis" : 0,
  "idleTimeoutMillis": 0
});
exports.pool = pool;