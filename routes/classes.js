const express = require("express")
const cors = require("cors")
const School = require("../School")
const Student = require("../Student")

let classes = express.Router()
classes.use(cors())
let mySchool = new School();
classes.get("/", (request, response)=>{
    response.json(mySchool)
})
classes.post("/", (request, response)=>{
    let classes = request.body.classes;
    let teacher = request.body.teacher;
// console.log(classes)
// console.log(teacher)
// if(mySchool.classes!==undefined|| classes!==undefined|| teacher!==undefined){
//     response.json({"error": "type in valid entries"})
// }else{
    mySchool.addClass(classes, teacher)
 response.json({
        "class": {"nameOfClass": classes, "teacher": teacher},
        "message": `Created a ${classes} class taught by ${teacher}`,
        "timestamp": new Date()})
    // }
    })

classes.post("/enroll", (request, response)=>{
    let classes = request.body.classes
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
            "student":{'studentInfo': studentInfo } ,
            "class": classes,
            "message": "enrolled, thank you!" + studentInfo
        })
    }        
})
classes.get("/:classes/nameOfStudentInput", (request, response)=>{
    let classes = request.params.classes;
    mySchool.listStudents(classes)
    response.json(mySchool.listStudents(classes))
})

module.exports = classes;