const route = require('express').Router();
const cors = require("cors");
const School = require("../School.js");
const Student = require("../Student.js")


route.use(cors())
let mySchool = new School()
const date = new Date ()



route.post("/class/:className/enroll", (req, res) => {
    let className = req.params.className
    let studentInfo = new Student(req.body.name, req.body.age, req.body.city, req.body.grade)
    mySchool.enrollStudent(className, studentInfo )
        res.json({
            student: studentInfo,
            className: className,
            message: "Enrolled Student",
            timestamp: date
            })
    })



route.get("/:className/students", (req, res) => {
    let className = req.params.className
    let failing = req.query.failing 
    let city = req.query.city
    let listOfStudents = mySchool.getStudentsByClass(className);
    if(!listOfStudents){
        res.json({
            "error": `Class ${className} doesn't exist.`,
            "timestamp": date
        })
    } else {
        res.json({
            name: className,                                                                                                                                                                                                                                                    
            students: listOfStudents,
        })
    }

})

// route.get("/:className/students/", (req, res) => {
//     let className = req.params.className
//     let failing = req.params.failing
//     res.json(mySchool.getStudentsByClassWithFilter(className, failing, city));
// })



route.post("/class/:name/:teacher", (req, res) => {
        let name = req.params.name
        let teacher = req.params.teacher
    if(mySchool.classes.className === name ){
        res.json({
            error: "Please fill out all the information or Class already exists",
            timestamp: date
        })
    } else {
         mySchool.addClass(name, teacher)
         res.json({
             class: { name: name, teacher: teacher, 
             students: []},
             message: "Created new class",
             timestamp: date


         })
           
    }
        

})

route.get("/", (req,res) => {
    res.json(mySchool)
})







// route.get("/:className/students", (req, res) => {
//     const className = req.params
//     let failing = req.body.failing
//     let city = req.body.city
//     let listOfStudents = mySchool.getStudentsByClass(className)
//     if(!mySchool.classes[className]){
//     mySchool.getStudentsByClass(className)
//     res.json({
//     "error": "Class doesn't exist"
//     })
//     } else if (failing || city ) {
//         let filteredArr = mySchool.getStudentsByClassWithFilter(className, failing, city);
//         res.json({
//             "students": [
//                 filteredArr
//             ],
//             "message": "Retrieved Students",
//             "timestamp": date
//           })
//     } else {
//         res.json({
//             "students": listOfStudents,
//             "message": "Retrieved Students",
//             "timestamp": date
//         })
//     }

// })


















module.exports = route;