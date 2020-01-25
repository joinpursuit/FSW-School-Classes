const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const port = 3000;
const app = express();

const loginRouter = require("./routes/login/login.js");
const classRouter = require("./routes/classes/classes.js");
const studentRouter = require("./routes/students/students.js");
const teacherRouter = require("./routes/teachers/teachers.js");

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); 

app.use("/login", loginRouter);
app.use("/class", classRouter);
app.use("/student", studentRouter);
app.use("/teacher", teacherRouter);

app.listen(port, () => console.log("Listening on port ", port));