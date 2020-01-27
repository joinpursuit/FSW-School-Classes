const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const School = require("./School.js");
const Student = require("./Student.js");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let mySchool = new School();
const date = new Date();

app.post("/class/:className/enroll", (req, res) => {
  try {
    let newStudent = new Student(
      req.body.name,
      req.body.age,
      req.body.city,
      req.body.grade
    );

    let studentInfo = mySchool.enrollStudent(req.params.className, newStudent);
    res.json({
      student: studentInfo,
      className: req.params.className,
      message: "Enrolled Student",
      timestamp: date
    });
  } catch (err) {
    res.json({
      error: "Please fill out all the information for the student",
      timestamp: date
    });
  }
});

app.get("/:className/students", (req, res) => {
  let className = req.params.className;
  let failing = req.query.failing;
  let city = req.query.city;
  let listOfStudents = mySchool.getStudentsByClass(className);
  if (!listOfStudents) {
    res.json({
      error: `Class ${className} doesn't exist.`,
      timestamp: date
    });
  } else {
    res.json({
      name: className,
      students: listOfStudents
    });
  }
});

app.post("/class/:name/:teacher", (req, res) => {
  let name = req.params.name;
  let teacher = req.params.teacher;
  if (!mySchool.classes.className) {
    mySchool.addClass(name, teacher);
    res.json({
      class: { name: name, teacher: teacher, students: [] },
      message: "Created new class",
      timestamp: date
    });
  } else {
    res.json({
      error: "Please fill out all the information or Class already exists",
      timestamp: date
    });
  }
});

app.get("/class", (req, res) => {
  res.json(mySchool);
});

app.listen(port, () => "listening");
