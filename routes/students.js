const students = require("express").Router()
let cors = require("cors")
const Student = require("../Student")
const Class = require("../Class")

let newClass = new Class();
// Create an Express route/endpoint to handle the request as seen above.
// Add the new student to <class-name> class.
// If the student is already enrolled in the given class, update/rewrite the student's information with the new data passed.
// Implement the method enrollStudent() in the School object for accomplishing this. This method should add the student to the students array within the Class object.

students.post("/", (request, response)=>{


})
students.patch("/", (request, response)=>{

})
students.get("/",(request, response)=>{
    
})


module.exports = students;