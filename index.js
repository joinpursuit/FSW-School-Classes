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


const newClass = (req, res, next) => {
    let newClass = req.body.name
    let newTeacher = req.body.teacher
    let timeStamp = new Date();
    mySchool.addClass(newClass, newTeacher)

        // console.log(mySchool.classes[newClass])

    res.json({
        "class": mySchool.classes[newClass],
        "message" : "Created a new class", 
        "time": timeStamp.toLocaleString()
    })
}

app.post("/class", newClass)

const checkNewStudent = (req, res, next) => {
    let name = req.body.name
    let age = req.body.age
    let city = req.body.city
    let grade = req.body.grade
    let className = req.params.className
    let timeStamp = new Date();


    if(!name || !age || !city || !grade){
        res.json({
            error: "Missing information",
            "message": timeStamp.toLocaleString()
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
    let timeStamp = new Date();
    let newStudent = mySchool.enrollStudent(className, name, age, city, grade)

if(newStudent.name === name){
    updateStudent(newStudent)
}
else{
    res.json(
        {"student": name,
        "className": className,
         "message": "student added",
         "time": timeStamp.toLocaleString()})
}
 }

app.post("/class/:className/enroll", checkNewStudent, newStudent)


const updateStudent = (req,res,next) => {
    let name = req.body.name
    let age = req.body.age
    let city = req.body.city
    let grade = req.body.grade
    let className = req.params.className

   mySchool.enrollStudent(name, age, city, grade)

res.json(
        {
         "student": name,
         "className": className,
         "age": age,
         "city": city,
         "grade": grade,
         "message": "student updated"})
}


app.put("/class/:className/enroll", updateStudent)


// const Midwood = new School()
// Midwood.addClass('Algebra', 'Mr. Paul')
// Midwood.enrollStudent('Algebra', 'Kadijah')
//console.log(Midwood.classes.Algebra.students);

app.listen(port, () => {
    console.log("running")
})