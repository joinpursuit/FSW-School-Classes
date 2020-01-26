const express = require("express")
const cors = require("cors")
const School = require("../School")
const Student = require("../Student")

let classes = express.Router()
classes.use(cors())
let mySchool = new School();
classes.get("/", (request, response) => {
    response.json(mySchool)
})
classes.post("/", (request, response) => {
    let classes = request.body.classes;
    let teacher = request.body.teacher;
    // console.log(classes)
    // console.log(teacher)
    // if(mySchool.classes!==undefined|| classes!==undefined|| teacher!==undefined){
    //     response.json({"error": "type in valid entries"})
    // }else{
    mySchool.addClass(classes, teacher)
    response.json({
        "classes": { "nameOfClass": classes, "teacher": teacher },
        "message": `Created a ${classes} class taught by ${teacher}`,
        "timestamp": new Date()
    })
    // }
})

classes.post("/enroll", (request, response) => {
    let classes = request.body.classes
    let student = request.body.student;
    let age = request.body.age;
    let city = request.body.city;
    let grade = request.body.grade;
    // let studentInfo = new Student(nameOfStudentInput,ageInput, cityInput, gradeInput).value
    // if(studentInfo === undefined|| studentInfo.age === undefined|| studentInfo.city=== undefined|| studentInfo.grade === undefined){
    //     response.json({"error": "type in valid entries"})
    // }else{
    //     mySchool.enrollStudent(studentInfo)
    mySchool.enrollStudent(classes, student, age, city, grade)
    response.json({
        "student": { 'student': student },
        "class": { 'classes': classes },
        "message": `you ${student} have been enrolled in ${classes} Thank You!`,
        "timestamp": new Date()
    })

})

classes.get("/lists", (request, response) => {
    let className = request.body.classes;
    mySchool.listStudents(className)
    response.json({
        "student": [{ "student": student }],
        "class": { "classes": classes },
        "Time": new Date(),
        "message": `${className}, list of students`
    })
})

module.exports = classes;