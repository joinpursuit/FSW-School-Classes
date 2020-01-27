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
 
  // if(!req.body.name || !req.body.teacher){
  //   res.json({
  //     status: 400,
  //     error: "Please fill out all the information.",
  //     timestamp: timestamp()
  //   })
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
  //let enrolledStudent = mySchool.enrollStudent(className, student)
  let enrolledStudent = res.data.enrolledStudent
  //console.log(`"3" ${res.data.enrolledStudent}`)
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


app.get("/class", showAllClasses);

app.post("/class", checkIfClassExists, addNewClass)
//app.get("/class/:className", newClass)
// app.post("/class/:classNameInput/enroll", enrollNewStudent)
app.post("/class/:className", enrollNewStudent)

app.listen(port,()=>{
  console.log("listening to port " + port)
})