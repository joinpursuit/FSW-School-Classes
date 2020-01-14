const students = require("express").Router()
let cors = require("cors")
const Student = require("../Student")
const Class = require("../Class")

let newClass = new Class();

students.post("/", (request, response)=>{


})
students.patch("/", (request, response)=>{

})
students.get("/",(request, response)=>{
    
})


module.exports = students;