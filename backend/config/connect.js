const mysql = require("mysql2");

const connect = mysql.createPool({
  // createPool shares multiple keys (connections) to the database for faster reuse.
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
}).promise();

module.exports = connect;
