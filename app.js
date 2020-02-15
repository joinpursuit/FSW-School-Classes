const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const timestamp = require("express-timestamp");
const School = require("./School.js");
const port = 3000;
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(timestamp.init);

let mySchool = new School();
mySchool.addClass("Environmental Science", "Ms. Obot")
mySchool.enrollStudent("Environmental Science", {name: "Jay Fowler", age: 25, city: "Bronx", grade: 91})
mySchool.enrollStudent("Environmental Science", {name: "Perry Platypus", age: 6, city: "Fowlerton", grade: 91})
mySchool.enrollStudent("Environmental Science", {name: "Peter Rollock", age: 45, city: "Bronx", grade: 55})
mySchool.addClass("World History", "Mr. Urrico")
mySchool.enrollStudent("World History", {name: "Jay Fowler", age: 25, city: "Bronx", grade: 96})
mySchool.enrollStudent("World History", {name: "Carlos Bell", age: 25, city: "Bronx", grade: 86})
mySchool.enrollStudent("World History", {name: "Floyd Mayweather", age: 41, city: "Calabasas", grade: 68})

app.get("/class", (req, res) => {
  try {
    let {timestamp} = req
    res.status(200).json({
      status: "success",
      message: "Retrieved all classes",
      payload: mySchool.classes,
      timestamp
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: "No classes were found",
      payload: null,
      timestamp
    });
  }
});

app.post("/class", (req, res) => {
  let {timestamp} = req
  let {className, teacher} = req.body

  try {
    let newClass = mySchool.addClass(className, teacher);
    res.status(200).json({
      status: "success",
      message: `${className} was added successfully.`,
      payload: newClass,
      timestamp
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Server is unable to create class",
      payload: null,
      timestamp
    });
  }
});

app.post("/class/:className/enroll", (req, res) => {
  
  try{
    let {timestamp} = req
    let {className} = req.params
    let {name, age, grade, city} = req.body
    age = parseInt(age)
    grade = parseInt(grade)
    let newStudent = mySchool.enrollStudent(className, {name, age, grade, city})

    res.status(200).json({
      status: "success",
      message: `${name} has been successfully enrolled in ${className}.`,
      payload: newStudent,
      timestamp
    })
  } catch(err){
    res.status(500).json({
      status: "error",
      message: "Server is unable to enroll student",
      payload: null,
      timestamp
    })
  }
});

const filterStudents = (req, res, next) => {
  try{
    let filter = Object.keys(req.query)
    if (filter.length){
      let {timestamp} = req
      let {className} = req.params
      let {failing, city} = req.query
      failing === "false" ? failing = false : failing = true
      let students = mySchool.getStudentsByClassWithFilter(className,failing,city)
  
      res.json({
        status: "success",
        message: "Retrieved all students with filter(s) applied.",
        payload: students,
        timestamp
      })
    } else {
      next()
    }
  } catch(err){
    res.status(500).json({
      status: "error",
      message: "Unable to filter students.",
      payload: null,
      timestamp
    })
  }
}

app.get("/class/:className/students", filterStudents, (req, res) => {
  try{
    let {timestamp} = req
    let {className} = req.params
    let students = mySchool.getStudentsByClass(className)

    res.status(200).json({
      status: "success",
      message: `Retrieved all students from ${className}.`,
      payload: students,
      timestamp
    })
  } catch(err){
    res.status(500).json({
      status: "error",
      message: "Unable to retrieve students in class",
      payload: null,
      timestamp
    })
  }
})

app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});
