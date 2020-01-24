const express = require("express")
const cors = require("cors")
const School = require("../School")
const Student = require("../Student")

let classes = express.Router()
classes.use(cors())
let mySchool = new School();
classes.post("/class", (request, response)=>{
    let nameOfClassInput = request.body.nameOfClassInput;
    let nameOfTeacherInput = request.body.nameOfTeacherInput;
if(mySchool.classes[nameOfClassInput]!==undefined|| nameOfClassInput!==undefined|| nameOfTeacherInput!==undefined){
    response.json({"error": "type in valid entries"})
}else{
    mySchool.addClass(nameOfClassInput, nameOfTeacherInput)
 response.json({
        "class": {"nameOfClass": nameOfClassInput, "nameOfTeacherInput": nameOfTeacherInput},
        "message": `Created a ${nameOfClassInput} class taught by ${nameOfTeacherInput}`,
        "timestamp": new Date()})
    }
    })
classes.post("/class/:nameOfStudentInput/enroll", (request, response)=>{
    let nameOfClassInput = request.params.nameOfClassInput
    let nameOfStudentInput = request.body.nameInput;
    if(nameOfStudentInput.nameInput === undefined|| nameOfStudentInput.ageInput === undefined|| nameOfStudentInput.cityInput=== undefined|| nameOfStudentInput.gradeInput === undefined){
        response.json({"error": "type in valid entries"})
    }else{
        mySchool.enrollStudent(nameOfClassInput, nameOfStudentInput)
        response.json({
            "student": {"name":nameOfStudentInput.nameInput, "age": nameOfStudentInput.ageInput, "city": nameOfStudentInput.cityInput, "age": nameOfStudentInput.ageInput},
            "class": nameOfClassInput,
            "message": "enrolled, thank you!"
        })
    }        
})

module.exports = classes;