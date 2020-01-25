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
classes.post("/enroll", (request, response)=>{
    let nameOfClassInput = request.body.nameOfClassInput
    let nameOfStudentInput = request.body.nameInput;
    let ageInput= request.body.ageInput;
    let cityInput = request.body.cityInput;
    let gradeInput = request.body.gradeInput;
    let studentInfo = new Student(nameOfStudentInput,ageInput, cityInput, gradeInput).value
    if(studentInfo === undefined|| studentInfo.age === undefined|| studentInfo.city=== undefined|| studentInfo.grade === undefined){
        response.json({"error": "type in valid entries"})
    }else{
        mySchool.enrollStudent(studentInfo)
        console.log(studentInfo)
        response.json({
            "student": studentInfo,
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