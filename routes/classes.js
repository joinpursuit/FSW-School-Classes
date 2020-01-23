const express = require("express")
const cors = require("cors")
const School = require("../School")
const Student = require("../Student")

let classes = express.Router()
classes.use(cors())
let mySchool = new School();
classes.post("/", (request, response)=>{
    let nameOfClass = request.body.nameOfClass;
    let nameOfTeacher = request.body.nameOfTeacher;
  response.json({
  "class": mySchool.class[nameOfClass],
  "message": `Created a ${nameOfClass} class taught by ${nameOfTeacher}`,
  "timestamp": new Date()})
})
classes.post("/enroll", (request, response)=>{

})

module.exports = classes;