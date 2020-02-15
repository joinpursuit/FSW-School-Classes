const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const School = require("./School.js");

const port = 3000;

let mySchool = new School()


app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));

const timestamp = () => {
  let date = new Date()
  return ` ${date.getFullYear()}, ${date.getMonth() + 1}/${date.getDate()}, ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}

const showAllClasses = (req, res) => {
  res.json({
   allClasses: mySchool.classes
  })
}

const checkIfClassExists = (req, res, next) => {
  if(mySchool.classes[req.body.name] ){
  res.json({
    status: 400,
    error: "The Class already exist",
    timestamp: timestamp()
  })
}else {
  next()
}
}

const addNewClass =(req, res) => {
   let addedClass = mySchool.addClass(req.body.name, req.body.teacher)
  res.json({
    status: 200,
    newClass: addedClass.name,
    teacher: addedClass.teacher,
    message: "Created a new class",
    timestamp: timestamp()
  })
}

const enrollNewStudent = (req, res) => {
  let className = req.params.className;
  let student = req.body
  console.log(`"1" ${className}`)
  console.log(`"2"${student}`)
  //let enrolledStudent = res.data.enrolledStudent
  let newStudent = mySchool.enrollStudent(className, student)
  res.json({
  status: 200,
  enrolledStudent: newStudent,
  className: className,
  message: "Student is enrolled",
  timestamp: timestamp()
})
}

const listStudentR = (req, res, next) =>{
  if (!mySchool.classes[req.params.className]) {
    res.json({
      error: `Class doesn't exist.`,
      timestamp: timestamp()
    })
    return
  }
  else if (req.query.failing == "false" && req.query.city == "") {

    res.json({
      students: mySchool.getStudentsByClass(req.params.className),
      message: "Retrieved Students",
      timestamp: timestamp()
    })
    return
  } else if (req.query.failing == "true" || req.query.city) {
    res.json({
      students : mySchool.getStudentsByClassWithFilter(
        req.params.className, req.query.failing, req.query.city
      )
    })
  }

  next()
}


app.get("/class", showAllClasses);
app.post("/class", checkIfClassExists, addNewClass)
app.post("/class/:className", enrollNewStudent)
app.get("/class/:className/students", listStudentR)

app.listen(port,()=>{
  console.log("listening to port " + port)
})