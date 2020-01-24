const express = require("express")
const cors = require("cors")
const School = require("../School")
const Student = require("../Student")

let classes = express.Router()
classes.use(cors())
let mySchool = new School();

classes.post("/", (request, response)=>{
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
classes.post("/:nameOfClassInput/enroll", (request, response)=>{
    let nameOfClassInput = request.body.nameOfClassInput
    let nameOfStudentInput = request.body.nameInput;
    let ageInput= request.body.ageInput;
    let cityInput = request.body.cityInput;
    let gradeInput = request.body.gradeInput;
    let newStudent = new Student(nameOfStudentInput,ageInput, cityInput, gradeInput)
    if(nameOfStudentInput.nameInput === undefined|| nameOfStudentInput.ageInput === undefined|| nameOfStudentInput.cityInput=== undefined|| nameOfStudentInput.gradeInput === undefined){
        response.json({"error": "type in valid entries"})
    }else{
        mySchool.enrollStudent(nameOfClassInput, nameOfStudentInput)
        response.json({
            "student": newStudent,
            "class": nameOfClassInput,
            "message": "enrolled, thank you!"
        })
    }        
})
classes.get("/:nameOfClassInput/nameOfStudentInput", (request, response)=>{
    let nameOfClassInput = request.params.nameOfClassInput;
    mySchool.listStudents(nameOfClassInput)
    response.json(mySchool.listStudents(nameOfClassInput))
})

module.exports = classes;