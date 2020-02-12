const express = require("express")
const cors = require("cors")
const School = require("../School")
const Student = require("../Student")
let classes = express.Router()
classes.use(cors())
let mySchool = new School();
classes.get("/", (request, response) => {
   try{
       response.json({
           classes,
           message:"success",

       })

   }catch(error){
       response.json({
           error:"data cant be retrieved",
       })

   }
})

classes.post("/add", (request, response) => {
    try{
        mySchool.addClass(request.body.class, request.body.teacher)
        response.json({
            status: "ok",
            message: request.body.class + " was added" 

        })
    }catch(error){
        response.json({
            status: "ok",
            message: "error or already exists"
        })

    }
})
// let classes = request.body.classes;
// let teacher = request.body.teacher;
// if(classes === classes && teacher===teacher){
// }else if(classes.length===0|| teacher.length===0){
//     response.json({message: "Please fill out all the information or Class already exists"})
// }else{
// mySchool.addClass(classes, teacher)
// response.json({
//     "classes": { "nameOfClass": classes, "teacher": teacher ,"students": []},
//     "message": `Created a ${classes} class taught by ${teacher}`,
//     "timestamp": new Date()
// })
// }

classes.post("/enroll", (request, response) => {
    try{
        let newInfo = request.body
        mySchool.enrollStudent(newInfo.class,{name: newInfo.name,age:newInfo.age,grade:newInfo.grade,city:newInfo.city})
        response.json({
            info: mySchool.classes[newInfo.class].students,
            message: newInfo.name + " has been added to " + newInfo.class 
        })
    }catch(error){
        response.json({
            error: "data could not be added or already exists"
        })
    }
})
// let classes = request.body.classes
// let student = request.body.student;
// let age = request.body.age;
// let city = request.body.city;
// let grade = request.body.grade;
// if(student.length=== 0|| age.length === 0|| city.length=== 0|| grade.length === 0){
//     response.json({message: "Please fill out all the information for the student"})
// }else{
// mySchool.enrollStudent(student, age, city, grade)
// response.json({
//     "student": { 'student': new Student(student, age, city, grade) },
//     "class": { 'classes': classes },
//     "message": ` ${student}, you have been enrolled in ${classes} Thank You!`,
//     "timestamp": new Date()
// })
// }

classes.get("/:className/lists", (request, response) => {
    let className = request.params.className;
    mySchool.getStudentsByClass(className)
    response.json({
        "classes": { "classes": classes },
        "Time": new Date(),
        "message": `${classes}, list of students`
    })

})
classes.get("/:className/lists/:failing", (request, response)=>{
    let className = request.params.className;
    let failing = request.params.failing;
    response.json(mySchool.getStudentsByClassWithFilter(className, failing))
})


module.exports = classes;