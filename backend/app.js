const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const pgp = require("pg-promise")({});
const connectionString = "postgres://localhost:5432/my_school_database";
const db = pgp(connectionString);

const port = 3000;
const app = express();

const classRouter = require("./routes/class/classes.js");
const studentRouter = require("./routes/students/student.js")

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); 

app.use("./class", classRouter);
app.use("./student", studentRouter);

app.listen(port, () => console.log("Listening on port ", port));