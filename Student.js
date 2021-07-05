const express = require("express")
const cors = require("cors")
const Student = express.Router()
Student.use(cors())
const bodyParser = require("body-parser")
Student.use(bodyParser.urlencoded({
  extended: false
}))
const School = require("./School.js")
const Class = require("./Class.js")
// class Student {
//   constructor(name, age, city, grade) {
//     this.name = name
//     this.city = city
//     this.age = age
//     this.grade = grade
//   }
// }

module.exports = Student;
