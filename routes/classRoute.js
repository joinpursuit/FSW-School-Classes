const route = require('express').Router();
const cors = require("cors");
const School = require("../School.js");
const Student = require("../Student.js")


route.use(cors())
let mySchool = new School()
const date = new Date ()


// route.post("/:className/enroll", (req, res) => {
//     let className = req.params.className
//     let name = req.body
//     let age = req.body
//     let city = req.body
//     let grade = req.body
//     let student = {
//         name,
//         age, 
//         city, 
//         grade
//     }
//     if(!mySchool.classes[className].student){
//         let newStudent = mySchool.enrollStudent(className, student)
//         res.json({
//             student: newStudent,
//             className: className,
//             message: "Enrolled Student",
//             timestamp: "YYY, MM/DD HH:MM:SS"
//             })
//         } else if(){

//         }
//     })



route.get("/:className/students", (req, res) => {
    let className = req.params.className
    let failing = req.query.failing 
    // let city = req.body.city
    let listOfStudents = mySchool.getStudentsByClass(className);
    if(!listOfStudents){
        res.json({
            "error": `Class ${className} doesn't exist.`,
            "timestamp": date
        })
    } else {
        res.json({
            students: listOfStudents
        })
    }

})

// route.get("/:className/students/", (req, res) => {
//     let className = req.params.className
//     let failing = req.params.failing
//     res.json(mySchool.getStudentsByClassWithFilter(className, failing, city));
// })

route.post("/:name/:teacher", (req, res) => {
    let name = req.params.name
    let teacher = req.params.teacher
    if(!mySchool.classes.name === name && !mySchool.classes.teacher === teacher){
    mySchool.addClass(name, teacher)
         res.json({
             class: { name: name, teacher: teacher, students: []},
             message: "Created new class",

         })
        } else {
            res.json({
                error: "Please fill out all the information or Class already exists",
                timestamp: date
                
   
            })        
        }

})



// const classRoute = require('express').Router();
// const cors = require("cors");
// const School = require("../School.js");
// const Student = require("../Student.js")


// classRoute.use(cors())
// let mySchool = new School()


// classRoute.get("/:className/students", (req, res) => {
//     const className = req.params
//     let failing = req.query
//     let city = req.query
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
//             "timestamp": "YYYY, MM/DD HH:MM:SS"
//           })
//     } else {
//         res.json({
//             "students": mySchool.getStudentsByClassWithFilter(className),
//             "message": "Retrieved Students",
//             "timestamp": "YYYY, MM/DD HH:MM:SS"
//         })
//     }

// })


















module.exports = route;