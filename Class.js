const express = require("express")
const cors = require("cors")
const Class = express.Router()
Class.use(cors())

const bodyParser = require("body-parser")
Class.use(bodyParser.urlencoded({
  extended: false
}))
const Student = require("./Student.js")
const School = require("./School.js")
let mySchool = new School()
// Class.post("/Class", (request, response)=>{
//   let teacher = request.body.name;
//   let classes = response.body.name;
//   console.log(classes,teacher)
// mySchool.addClass(teacher,classes)



// })

module.exports = Class;
