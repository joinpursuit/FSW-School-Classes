const express = require('express')
const app = express()
const bodyParser = require ('body-parser')
const port = 8080;

app.use(bodyParser.urlencoded({
    extended: false
}))


const School = require('./School.js')

let mySchool = new School();
// console.log(mySchool)

app.get('/all', (req,res) => {
    let allRequest = mySchool.classes;
    res.send( allRequest )
})

// app.post("/addClass/:className/:teacher", (req, res) => {
// let class_request = req.params.className;
// let teacherName = req.params.teacher;
// // console.log(class_request, teacherName)   
// if(!class_request || !teacherName){
//     res.send({
//         error: "Missing Information"
//     })
// }else {
//     res.json(mySchool.addClass(class_request, teacherName))   
// }
// })

const newClass = (req, res, next) => {
    let newClass = req.body.name
    let newTeacher = req.body.teacher
    mySchool.addClass(newClass, newTeacher)

        console.log(mySchool.classes[newClass])
    res.json({
        "class": mySchool.classes[newClass],
        "message" : "Created a new class"
    })
}

const checkNewStudent = (req, res, next) => {
    let name = req.body.name
    let age = req.body.age
    let city = req.body.city
    let grade = req.body.grade
    let className = req.params.className

    let newStudent = mySchool.enrollStudent(className, name, age, city, grade)
    if(!name || !age || !city || !grade){
        res.json({
            error: "Missing information"
        })
        
    }else{
    next()
    }
}
 const newStudent =(req, res, next) => {
    let name = req.body.name
    let age = req.body.age
    let city = req.body.city
    let grade = req.body.grade
    let className = req.params.className
    let newStudent = mySchool.enrollStudent(className, name, age, city, grade)
if(newStudent){
    updateStudent(newStudent)
}else{
    res.json(
        {"student": name,
        "className": className,
         "message": "student added"})
}
 }

const updateStudent = () => {
    let name = req.body.name
    let age = req.body.age
    let city = req.body.city
    let grade = req.body.grade
    let className = req.params.className
    let newStudent = mySchool.enrollStudent(className, name, age, city, grade)

}

app.post("/class", newClass)
app.post("/class/:className/enroll", checkNewStudent, newStudent)
app.patch("/class/:className/enroll", updateStudent)


// const Midwood = new School()
// Midwood.addClass('Algebra', 'Mr. Paul')
// Midwood.enrollStudent('Algebra', 'Kadijah')
//console.log(Midwood.classes.Algebra.students);

app.listen(port, () => {
    console.log("running")
})