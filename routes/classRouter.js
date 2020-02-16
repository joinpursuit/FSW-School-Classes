const classRouter = require("express").Router();
const mySchool = require("./../School.js");
const displayTime = require("./../build.js");

classRouter.get("/", (req, res) => {
  res.json(mySchool.classes);
});

classRouter.post("/", (req, res) => {
  res.json(req.body);
});

classRouter.post("/add", (req, res) => {
  let name = req.body.name;
  let teacher = req.body.teacher;

  if (mySchool.classes[name]) {
    res.json({
      error: "Please fill out all the information or Class already exists",
      timestamp: displayTime()
    });
  } else {
    mySchool.addClass(name, teacher);

    res.json({
      class: mySchool.classes[name],
      message: "Created a new class",
      status: "ok",
      timestamp: displayTime()
    });
  }
});

const isStudentEnrolled = (studentName, className) => {
  let studentsArr = mySchool.classes[className].students;

  return studentsArr.some(student => {
    if (studentName === student.name) {
      return true;
    }
  });
};

classRouter.post("/:className/enroll", (req, res) => {
  let className = req.params.className;
  let studentName = req.body.name;
  let studentAge = req.body.age;
  let studentCity = req.body.city;
  let studentGrade = req.body.grade;
  let studentsArr = mySchool.classes[className].students;

  const UpdateStudentInfo = (student, className) => {
    studentsArr.forEach(studentInClass => {
      if (student === studentInClass.name) {
        studentInClass.name = className;
        studentInClass.name = student;
        studentInClass.age = studentAge;
        studentInClass.city = studentCity;
        studentInClass.grade = studentGrade;
        res.json({
          student: studentName,
          message: "Updated Student",
          timestamp: displayTime()
        });
      }
    });
  };

  if (isStudentEnrolled(studentName, className)) {
    UpdateStudentInfo(studentName, className);
  } else {
    let result = mySchool.enrollStudent(
      className,
      studentName,
      studentAge,
      studentCity,
      studentGrade
    );

    res.json({
      student: result,
      className: className,
      message: "Enrolled Student",
      timestamp: displayTime()
    });
  }
});

classRouter.get("/:className/students", (req, res) => {
  let classChosen = req.params.className;
  let failing = req.query.failing;
  let city = req.query.city;
  let obj = req.query;

  if (!mySchool.classes.hasOwnProperty(classChosen)) {
    res.json({
      error: `Class ${classChosen} doesn't exist.`,
      timestamp: displayTime()
    });
  } else if (Object.keys(obj).length < 1) {
    let students = mySchool.getStudentsByClass(classChosen);
    res.json({
      students: students,
      message: "Retrieved Students",
      timestamp: displayTime()
    });
  } else if (Object.keys(obj).length >= 1) {
    let students2 = mySchool.getStudentsByClassWithFilter(
      classChosen,
      failing,
      city
    );
    res.json({
      students: students2,
      message: "Retrieved Students",
      timestamp: displayTime()
    });
  }
});

module.exports = classRouter;
