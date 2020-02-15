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



const addNewClass = (req, res, next) => {
  try{
    let name = req.params.name;
    let teacher = req.params.teacher;
    if (!mySchool.classes.className) {
      mySchool.addClass(name, teacher);
      res.status(200).json({
        class: { name: name, teacher: teacher, students: [] },
        message: "Created new class",
        timestamp: date
      });
    }
  }catch(err){
    res.status(400).json({
        error: "Please fill out all the information or Class already exists",
        timestamp: date
    });
  }
}

const enrollNewStudent = (req, res, next) => {
  try{
    let newStudent = new Student(
      req.body.name,
      req.body.age,
      req.body.city,
      req.body.grade
    );

    let studentInfo = mySchool.enrollStudent(req.params.className, newStudent);
    res.status(200).json({
      student: studentInfo,
      className: req.params.className,
      message: "Enrolled Student",
      timestamp: date
    });
  }catch(err){
    res.status(400).json({
      error: "Please fill out all the information for the student",
      timestamp: date
    });
    next()
  }
}

const getStudents = (req, res, next) => {
  try{
    let className = req.params.className;
    let failing = req.query.failing;
    let city = req.query.city;
    let listOfStudents = mySchool.getStudentsByClass(className, failing, city);
    if (listOfStudents) {
      res.status(200).json({
        student: listOfStudents,
        message: "Retrieved filtered students",
        timestamp: date
      });
    }
  }catch(err){
      res.status(400).json({
        error: `Class ${className} doesn't exist`,
        timestamp: date
      })
      next()
  }
}


app.post("/class/:className/enroll", enrollNewStudent)

app.get("/:className/students", getStudents)

app.post("/class/:name/:teacher", addNewClass)

app.get("/class", (req, res) => {
  res.json(mySchool);
});

app.listen(port, () => "listening");
