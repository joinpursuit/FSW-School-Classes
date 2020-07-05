//pg-promise setup
const pgp = require("pg-promise")(); // import promise
const connectionString = "postgres://localhost:5432/vonbarown_univeristy"; //URL where Postgres is running
const db = pgp(connectionString); //connected db instance

module.exports = db;
