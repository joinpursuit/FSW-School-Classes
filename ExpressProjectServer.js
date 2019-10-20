const express = require('express')
const bodyParser = require('body-parser')
const School = require('./school.js')
const cors = require('cors')
const app = express();

app.use(cors())
let mySchool = new School();

const port = 8000;

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

const timeStamp = () => new Date().toLocaleString()

const addClassMethod = (req, res, next) => {
    const className = req.body.className
    const classTeacher = req.body.teacher

    res.send({
        class: mySchool.addClass(className, classTeacher),
        message: "Created a new class",
        timeStamp: timeStamp()
    })
}

const validateClass = (req, res, next) => {
    let classname = req.body.name;

    !!mySchool['classes'][classname] ? res.send({
        error: 'Class already exist',
        timeStamp: timeStamp()
    }) : next()
}

app.post('/class', validateClass, addClassMethod)

validateStudent = (req, res, next) => {
    console.log("validating")
    let studentObj = req.body
    let classname = req.params.classname;

    let arr = mySchool['classes'][classname]['students'];
    console.log(arr);

    arr.forEach(el => {
        console.log(el.name);

        if (el.name === studentObj.name) {
            el.age = studentObj.age;
            el.city = studentObj.city;
            el.grade = studentObj.grade;

            res.send(el)
        }
    })
    next()
}

const enrollClass = (req, res, next) => {
    let classname = req.params.classname;
    let studentObj = req.body
    res.send({
        classname: classname,
        student: mySchool.enrollStudent(classname, studentObj),
        message: 'Enrolled Student',
        timeStamp: timeStamp()
    })
}

app.post('/class/:classname/enroll', validateStudent, enrollClass, validateStudent)


const getStudentsByClass = (req, res, next) => {
    let classname = req.params.classname;
    let city = req.body.city

    res.send({
        students: mySchool.getStudentsByClass(classname),
        message: 'Retrieved Students',
        timeStamp: timeStamp()
    })
}


app.get('/class/:classname/students', getStudentsByClass)




app.listen(port, () => {
    console.log(`Running at http://localhost:${port}/`);

})