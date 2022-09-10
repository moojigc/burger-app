const mysql = require("mysql2/promise");
require("./env");

class Connection {
  constructor(config) {
    const { DATABASE, DB_HOST, DB_USER, DB_PASSWORD } = config;
    console.log(`Connected to ${DATABASE} on ${DB_HOST} as ${DB_USER}`);
    this.database = DATABASE;
    this.host = DB_HOST;
    this.user = DB_USER;
    this.password = DB_PASSWORD;
  }
  async dbConnect() {
    return await mysql.createPool({
      database: this.database,
      host: this.host,
      user: this.user,
      password: this.password,
    });
  }
}

module.exports = Connection;
