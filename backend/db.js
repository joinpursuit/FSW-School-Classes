const initOptions= {
    // Initialization options
};

const pgp = require("pg-promise")(initOptions);
const connectionString = "postgres://localhost:5432/my_school_database";
const db = pgp(connectionString);

module.exports = {pgp, db};