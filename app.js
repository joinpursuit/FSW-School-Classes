const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 4000;
let School = require("./School");
const Class = require("./Class");
const Student = require("./Student");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let mySchool = new School();
const allClasses = (request, response) => {
  response.status(200).json({
    status: "success",
    message: "All classes",
    body: mySchool.class
  });
};
const checkClassName = (request, response, next) => {
  console.log("checkClassName");
  let name = request.body.name;
  let teacher = request.body.teacher;
  if (!name || !teacher) {
    response.json({
      error: "not valid data",
      time: new Date()
    });
  } else {
    next();
  }
};
const addClass = (request, response) => {
  console.log("addClass");
  let name = request.body.name;
  let teacher = request.body.teacher;
  let newClass = School.addClass(name, teacher);
  response.status(200).json({
    status: "success",
    message: "added a new class",
    body: newClass,
    time: new Date()
  });
};
const ifRepeated = (request, response, next) => {
  console.log("ifRepeated");
  let className = request.body.name;
  if (!mySchool.classes[className]) {
    response.json({
      error: "class exists",
      time: new Date()
    });
  }
  next();
};
const enrollStudent = (request, response) => {
 
  let newStudent = mySchool.enrollStudent

};
const classExist = (request, response, next) => {
  let className = request.params.classes;
  if (!mySchool.classes[className]) {
    response.json({});
  } else {
    next();
  }
};
const studentExist = (request, response, next) => {
  if (
    !request.body.name ||
    !request.body.age ||
    !request.body.city ||
    !request.body.grade
  ) {
    response.json({
      error: "student exists",
      time: new Date()
    });
  } else {
    next();
  }
};
const studentBody = (request, response) => {
  let className = request.body.classes;
  let failing = request.query.failing;
  let city = request.query.city;
  if (failing === "true") {
    failing = true;
  } else {
    failing = false;
  }
  let filtered = [];
  if (!failing && !city) {
    filtered = mySchool.getStudentsByClass(className);
  } else {
    response.json({
      students: filtered,
      message: "Retrieved Students",
      timestamp: new Date()
    });
  }
};

app.get("/", allClasses);
app.post("/class", checkClassName, addClass, ifRepeated);
app.post("/class/:className", classExist, enrollStudent, studentExist);
app.get("/class/:className/students/failing", classExist, studentBody);

app.listen(port, () => {
  console.log("server is running", port);
});
