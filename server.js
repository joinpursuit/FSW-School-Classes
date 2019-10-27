const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const School = require("./School.js")
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
let mySchool = new School();

const port = 8080;

function timestamp() {
  let date = new Date()
  return ` ${date.getFullYear()} , ${date.getMonth() + 1}/${date.getDate()} , ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} `
}

function CheckifClassExists(req, res, next) {
  if (!req.body.name || !req.body.teacher) {
    res.json({
      error: "Please fill out all the information",
      timestamp: timestamp()
    })
    return
  }
  else if (mySchool.classes[req.body.name]) {
    res.json({
      error: "Class already exists",
      timestamp: timestamp()
    })
    return
  }
  next()
}

function ValidateStudent(req, res, next) {
  if (!req.body.name || !req.body.age || !req.body.city || !req.body.grade) {
    res.json({
      error: "Please fill out all the information for the student",
      timestamp: timestamp()
    })
    return
  }
  if (!mySchool.classes[req.params.className]) {
    res.json({
      error: "Class doesn't exist",
      timestamp: timestamp()
    })
    return
  }
  next()
}

function SameStudent(req, res, next) {
  let studentsArr = mySchool.classes[req.params.className].students

  for (let i = 0; i < studentsArr.length; i++) {

    if (req.body.name === studentsArr[i].name) {
      for (let key in req.body) {
        studentsArr[i][key] = req.body[key]
      }
      res.json({
        student: studentsArr[i],
        className: req.params.className,
        message: "Updated Student",
        timestamp: timestamp()
      })
      return
    }

  }
  next()

}

function ListMiddleWare(req, res, next) {

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

app.post('/class', CheckifClassExists, (req, res) => {
  mySchool.addClass(req.body.name, req.body.teacher)
  let response = {
    class: mySchool.classes[req.body.name],
    message: "Created a new class",
    timestamp: timestamp()
  }
  res.json(response)
})


app.post('/class/:className/enroll', ValidateStudent, SameStudent, (req, res) => {

  res.json({
    student: mySchool.enrollStudent(req.params.className, req.body),
    className: req.params.className,
    message: "Enrolled Student",
    timestamp: timestamp()
  })
})

app.get('/class/:className/students', ListMiddleWare, (req, res) => {

  res.json({
    students: mySchool.getStudentsByClassWithFilter(req.params.className, req.query.failing, req.query.city),
    message: "Retrieved Students",
    timestamp: timestamp()
  })
})

app.listen(port)