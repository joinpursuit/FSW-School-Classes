const express = require("express")
const cors = require("cors")
const classes = express.Router()
classes.use(cors())

const bodyParser = require("body-parser")
classes.use(bodyParser.urlencoded({
  extended: false
}))
const Student = require("../Student.js")
const School = require("../School.js")
let mySchool = new School()
classes.post("/", (request, response) => {
  let nameOfClass = request.body.nameOfClass
  let nameOfTeacher = request.body.nameOfTeacher;
  console.log(nameOfClass, nameOfTeacher)
  mySchool.addClass(nameOfClass, nameOfTeacher)
  response.json({
    "class": mySchool.classes[nameOfClass],
    "message": `Enter Class and Teacher name ${nameOfClass} ${nameOfTeacher}`,
    "dateAdded": new Date()
  })
  classes.post("/enroll", (request, response) => {
    let nameOfClass = request.params.nameOfClass
    let nameOfStudent = request.params.nameOfStudent
    let age = request.body.age
    let city = request.body.city
    let grade = request.body.grade
    let newStudent = new Student(nameOfStudent, age, city, grade)
    mySchool.enrollStudent(nameOfClass, newStudent)
    response.json({
      student: newStudent, nameOfClass: nameOfClass, message: `${nameOfStudent} you are enrolled`,
      dateAdded: new Date()
    })
  })
})

module.exports = classes;