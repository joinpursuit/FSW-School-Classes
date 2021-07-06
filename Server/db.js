const pgp = require('pg-promise')();
const connectString = 'postgres://localhost:5432/sealab_2021_db';
const db = pgp(connectString);

module.exports = db;