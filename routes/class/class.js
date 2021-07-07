const classRouter = require("express").Router({ mergeParams: true });
const Student = require("../../Student.js");
const bodyParser = require("body-parser");
const School = require("../../School.js");
const mySchool = new School();
console.log(mySchool);

classRouter.use(bodyParser.urlencoded({ extended: false }));
classRouter.use(bodyParser.json());

classRouter.post("/", (req, res) => {
  const { name, teacher } = req.body;
  if (!mySchool.classes.hasOwnProperty(name) && name !== "" && teacher !== "") {
    mySchool.addClass(name, teacher);
    res.json({
      class: { name: name, teacher: teacher, students: [] },
      message: "Created a new class",
      timestamp: new Date().toString()
    });
  } else {
    res.json({
      error: "Please fill out all the information or Class already exists",
      timestamp: new Date().toString()
    });
  }
  console.log(mySchool);
}); //end post

classRouter.post("/:className/enroll", (req, res) => {
  const { className } = req.params;
  const { name, age, city, grade } = req.body;
  const schoolClass = mySchool.classes[className];
  if (!schoolClass) {
    res.json({
      error: "Class doesn't exist!",
      timestamp: new Date().toString()
    });
  }
  let studentsArr = schoolClass["students"];
  if (!className || !name || !age || !city || !grade) {
    res.json({
      error: "Please fill out all the information for the student",
      timestamp: new Date().toString()
    });
  } else if (!studentsArr.some(obj => obj.name === name)) {
    mySchool.enrollStudent(className, new Student(name, age, city, grade));
    res.json({
      student: { name: name, age: age, city: city, grade: grade },
      className: className,
      message: "Enrolled Student",
      timestamp: new Date().toString()
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
          timestamp: new Date().toString()
        });
      }
    });
  }
  console.log(mySchool);
}); //end post

classRouter.get("/:className/students", (req, res) => {
  const { className } = req.params;
  const { failing, city } = req.query;
  const schoolClass = mySchool.classes[className];
  if (!schoolClass) {
    res.json({
      error: "Class doesn't exist!",
      timestamp: new Date().toString()
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
      timestamp: new Date().toString()
    });
  } else {
    let studentArr = mySchool.getStudentsByClass(className);
    res.json({
      students: studentArr,
      message: "Retrieved Students",
      timestamp: new Date().toString()
    });
  }
});

module.exports = classRouter;
