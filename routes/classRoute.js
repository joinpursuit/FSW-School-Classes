const route = require('express').Router();
const cors = require("cors");
const School = require("../School.js");
const Student = require("../Student.js")


route.use(cors())
let mySchool = new School()
const date = new Date ()


route.post("/class/:className/enroll", (req, res) => {
    let className = req.params.className
    let name
    mySchool.enrollStudent(className, req.body)
        res.json({
            student:{ "name": req.body.name, "age": req.body.age, "city": req.body.city, "grade": req.body.grade},
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
    if(mySchool.classes.className === name){
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


























module.exports = route;