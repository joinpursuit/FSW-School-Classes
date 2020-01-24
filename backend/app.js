const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const port = 3000;
const app = express();

const loginRouter = require("./routes/login/login.js");
const classRouter = require("./routes/class/classes.js");
const studentRouter = require("./routes/student/student.js");
const teacherRouter = require("./routes/teacher/teacher.js");

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); 

app.use("/login", loginRouter);
app.use("/class", classRouter);
app.use("/student", studentRouter);
app.use("/teacher", teacherRouter);

app.listen(port, () => console.log("Listening on port ", port));