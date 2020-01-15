const express = require("express")
const cors = require("cors")
const classes = express.Router()
classes.use(cors())
const Student = require("../Student")
const School = require("../School")
let mySchool = new School();

  // * Add class to classes

//    * 
//    * @param {string} name - Name of the class
//    * @param {string} teacher - Name of instructor 
//    * @return {Class} Class object
//    */
let newClass = new Class();
// Create an Express route/endpoint to handle the request as seen above.
// Add the new student to <class-name> class.
// If the student is already enrolled in the given class, update/rewrite the student's information with the new data passed.
// Implement the method enrollStudent() in the School object for accomplishing this. This method should add the student to the students array within the Class object.
classes.post("/add",()=>{
    let newClass = {
        name: request.params.name,
        teacher: request.params.teacher
    }
    if(!newClass.name|| !newClass.teacher){
        response.send("add name of course and teacher")
    }else {
        newClass.name = newClass.name.split(", ")
        classes.push(newClass)
        response.json(classes)

    }
    console.log(newClass)
})


classes.patch("/:nameOfClass/students", (request, response)=>{
let nameOfClass = request.body.nameOfClass;
})
classes.get("/nameOfClass/:students/:failing",(request, response)=>{

})
classes.delete("/:name",(request,response)=>{
    let {name} = request.params
    classes = classes.filter(aClass=>aClass.name !==name)
    response.status(200).json({
        message:"class deleted",
        remainingClasses:classes

    })

})

module.exports = classes;