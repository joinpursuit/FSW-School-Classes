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
   mySchool.addClass(req.body.name, req.body.teacher)
  res.json({
    status: 200,
    newClass: req.body.name,
    teacher: req.body.teacher,
    message: "Created a new class",
    timestamp: timestamp()
  })
}

const enrollNewStudent = (req, res) => {
  let className = req.params.className;
  let student = req.body
  console.log(`"1" ${className}`)
  console.log(`"2"${student}`)
  let enrolledStudent = res.data.enrolledStudent
  res.json({
  status: 200,
  enrolledStudent: res.data.enrolledStudent,
  className: className,
  message: "Student is enrolled",
  timestamp: timestamp()
})
}
// const newClass = (req, res) =>{
//   let className = req.params.className;
//   res.json({
//     status:200,
//     className: className,
//     message: "Student is enrolled",
//     timestamp: timestamp()
//   })
//   console.log(className);
  
// }
const listStudentR = (req, res, next) =>{
  if (!mySchool.classes[req.params.className]) {
    res.json({
      error: `Class ${req.params.className} doesn't exist.`,
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
  }

  next()
}


app.get("/class", showAllClasses);
app.post("/class", checkIfClassExists, addNewClass)
app.post("/class/:className", enrollNewStudent)
app.get("/class/:className/Students", listStudentR)

app.listen(port,()=>{
  console.log("listening to port " + port)
})