const classRouter = require("express").Router();
const mySchool = require("./../School.js");
const displayTime = require("./../build.js");

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

classRouter.post("/:className/enroll", (req, res) => {
  let className = req.params.className;
  let studentName = req.body.name;
  let studentAge = req.body.age;
  let studentCity = req.body.city;
  let studentGrade = req.body.grade;
  let studentsArr = mySchool.classes[className].students;

  studentsArr.forEach(student => {
    if (studentName === "" || studentAge === "" || studentCity === "") {
      res.json({
        error: "Please fill out all the information for the student",
        timestamp: displayTime()
      });
    } else if (student.name === studentName) {
      student.name = studentName;
      student.age = studentAge;
      student.city = studentCity;
      student.grade = studentGrade;
    } else {
      let result = mySchool.enrollStudent(
        className,
        studentName,
        studentAge,
        studentCity
      );
      res.json({
        student: result,
        className: className,
        message: "Enrolled Student",
        timestamp: displayTime()
      });
    }
  });
});

classRouter.get("/:className/students", (req, res) => {
  let classChosen = req.params.className;
  let failing = req.query.failing;
  let city = req.query.city;
  let obj = req.query;

  if (Object.keys(obj).length < 1) {
    let students = mySchool.getStudentsByClass(classChosen);
    console.log(mySchool.classes[classChosen]);

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
  } //else if(mySchool.classes[classChosen].name === false) {
  // res.json({
  //     "error": `Class ${classChosen} doesn't exist.`,
  //     "timestamp": timestamp()
  //   })
  // }
});

module.exports = classRouter;
