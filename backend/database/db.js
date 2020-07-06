//pg-promise setup
const pgp = require("pg-promise")(); // import promise
const connectionString = process.env.DATABASE_URL; //URL where Postgres is running
const db = pgp(connectionString); //connected db instance

module.exports = db;
