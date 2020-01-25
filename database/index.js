const pgp = require('pg-promise')({});
const db = pgp('postgress://localhost:5432/school_of_hogwarts');
module.exports = database;