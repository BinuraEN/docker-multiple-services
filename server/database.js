const mysql = require("mysql2");
const keys = require("./keys");

/**
 * connection pool is used so that every time
 * you need to access db no code is require to
 * create connections
 * */

const pool = mysql.createPool({
  host: keys.mysqlHost,
  user: keys.mysqlUser,
  database: keys.mysqlDatabase,
  password: keys.mysqlPassword,
  port: keys.mysqlPort,
});

//exporting a promise to allow using promises instead of callbacks
module.exports = pool.promise();
