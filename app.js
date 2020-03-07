const express = require("express");
const cors = require("cors");
// const time = require("express-timestamp");
const bodyParser = require("body-parser");
const port = 3000;
const app = express();
const School = require("./backend/models/School");

let rhdb = new School();
console.log(rhdb);
//import school
//create new instance of school

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/rhdb", (req, res) => {
  res.json(rhdb.schoolData);
});

app.post("/rhdb/class", (req, res, next) => {
  try {
    const { name, teacher } = req.body;
    rhdb.addClass(name, teacher);
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

app.post("/rhdb/:className/enroll", (req, res, next) => {
  try {
    const { className } = req.params;
    //const { name, age, city, grade } = req.body;

    rhdb.enrollStudent(className, req.body);

    res.json({
      student: req.body,
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

app.get("/rhdb/:className/students", (req, res, next) => {
  console.log('this is req.query',req.query)
  const { className } = req.params;
  const { failing, city } = req.query;
  if (failing || city) {
    let filteredStudents = rhdb.getStudentsByClassWithFilter(
      className,
      failing,
      city
    );
    res.json({
      students: filteredStudents,
      message: "retrieved students",
      timestamp: new Date().toString()
    });
  } else {
    let students = rhdb.getStudentsByClass(className);

    res.json({
      students,
      message: "retrieved students",
      timestamp: new Date().toString()
    });
  }
});

//create all routes and test them by using console.log

//start adding functionality to each route

app.listen(port, () => {
  console.log("listening to port", port);
});
