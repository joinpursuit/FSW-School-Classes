const express = require("express");
const cors = require("cors");
const time = require("express-timestamp");
const bodyParser = require("body-parser");
const port = 3000;
const app = express();
const School = require("./School");

let colegio = new School();
// console.log(colegio);
//import school
//create new instance of school

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/colegio", (req, res) => {
  res.json(colegio.classes);
});

app.post("/colegio/class", (req, res) => {
  try {
    const { name, teacher } = req.body;
    // console.log(req.body);
    colegio.addClass(name, teacher);
    res.json({
      class: { name: name, teacher: teacher, students: [] },
      message: "new class created",
      timestamp: new Date().toString()
    });
  } catch (error) {
    res.json({
      error: "Please fill out all the information or Class already exists",
      timestamp: new Date().toString()
    });
  }
});

app.post("/colegio/:className/enroll", (req, res) => {
  try {
    const { className } = req.params;
    const { name, age, city, grade } = req.body;
    console.log(req.body);

    colegio.enrollStudent(name, age, city, grade);

    res.json({
      student: { name: name, age: age, city: city, grade: grade },
      className: className,
      message: "student enrolled",
      timestamp: new Date().toString()
    });
  } catch (error) {
    res.json({
      error: "Please fill out all the information or Class already exists",
      timestamp: new Date().toString()
    });
  }
});

//create all routes and test them by using console.log

//start adding functionality to each route

app.listen(port, () => {
  console.log("listening to port", port);
});
