const express = require("express")
const classes = require("express").Router()
const cors = require("cors")
const Student = require("../Student")
const School = require("../School")
let mySchool = new School();
// Create an Express route/endpoint to handle the request as seen above.

// This endpoint should return all the students enrolled on <class-name>.
// If query parameters are passed:
// If failing=true, return all students that are failing the class, that is all students whose grade is less than 70.
// If a city is passed return students whose city match the city passed.
// If both failing and city are passed return students that are failing and that live in the specified city.
// If not matches for students failing or in a given city are found, the students property of the response should have an empty array.
// If the given class <class-name> doesn't exist and error should be returned.
// Implement the methods getStudentsByClass() and getStudentsByClassWithFilter() in the School class for accomplishing this.

classes.post("/classes/:enroll", (request, response)=>{
   
let enrolledStudent = {
    name:request.body.name,
    age: request.body.age,
    city:request.body.city,
    grade:request.body.grade
}

let nameOfClass = request.params.nameOfClass
let newStudent = new Student(enrolledStudent)
if(enrolledStudent.name === undefined|| enrolledStudent.age === undefined||enrolledStudent.city === undefined||enrolledStudent.grade=== undefined){
    response.json("add name, age, city and grade")
}else{
    mySchool.enrolledStudent(newStudent, nameOfClass) 
    response.json({ enrolled: newStudent.name, student:newStudent.city, date: new Date(), message: `${enrolledStudent}has been enrolled in ${nameOfClass}`})
}

})
classes.patch("/:nameOfClass/students", (request, response)=>{
let nameOfClass = request.body.nameOfClass;
})
classes.get("/nameOfClass/:students/:failing",(request, response)=>{

})

module.exports = classes;