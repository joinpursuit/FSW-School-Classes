const express = require("express");
const time = require("express-timestamp");
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 3000;
const app = express();
app.use(cors());
app.use(time.init);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const School = require("./School.js");
const Student = require("./Student.js");

let mySchool = new School();

app.get("/", (req, res) => {
  res.json(mySchool);
}); //end get

app.post("/class", (req, res) => {
  const { name, teacher } = req.body;
  if (!mySchool.classes.hasOwnProperty(name) && name !== "" && teacher !== "") {
    mySchool.addClass(name, teacher);
    res.json({
      class: { name: name, teacher: teacher, students: [] },
      message: "Created a new class",
      timestamp: req.timestamp
    });
  } else {
    res.json({
      error: "Please fill out all the information or Class already exists",
      timestamp: req.timestamp
    });
  }
}); //end post

app.post("/class/:className/enroll", (req, res) => {
  const { className } = req.params;
  const { name, age, city, grade } = req.body;
  const schoolClass = mySchool.classes[className];
  if (!schoolClass) {
    res.json({
      error: "Class doesn't exist!",
      timestamp: req.timestamp
    });
  }
  let studentsArr = schoolClass["students"];
  if (!className || !name || !age || !city || !grade) {
    res.json({
      error: "Please fill out all the information for the student",
      timestamp: req.timestamp
    });
  } else if (!studentsArr.some(obj => obj.name === name)) {
    mySchool.enrollStudent(className, new Student(name, age, city, grade));
    res.json({
      student: { name: name, age: age, city: city, grade: grade },
      className: className,
      message: "Enrolled Student",
      timestamp: req.timestamp
    });
  } else {
    studentsArr.forEach(student => {
      if (student.name === name) {
        student.age = age;
        student.city = city;
        student.grade = grade;
        res.json({
          student: { name: name, age: age, city: city, grade: grade },
          className: className,
          message: "Updated Student",
          timestamp: req.timestamp
        });
      }
    });
  }
}); //end post

app.get("/class/:className/students", (req, res) => {
  const { className } = req.params;
  const { failing, city } = req.query;
  const schoolClass = mySchool.classes[className];
  if (!schoolClass) {
    res.json({
      error: "Class doesn't exist!",
      timestamp: req.timestamp
    });
  } else if (failing || city) {
    let filteredArr = mySchool.getStudentsByClassWithFilter(
      className,
      failing,
      city
    );
    res.json({
      students: filteredArr,
      message: "Retrieved Students",
      timestamp: req.timestamp
    });
  } else {
    let studentArr = mySchool.getStudentsByClass(className);
    res.json({
      students: studentArr,
      message: "Retrieved Students",
      timestamp: req.timestamp
    });
  }
});

app.listen(port, () => console.log("Listening on port: ", port));
