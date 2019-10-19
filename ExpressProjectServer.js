const express = require('express')
const bodyParser = require('body-parser')
const School = require('./school.js')
const app = express();
let mySchool = new School();

const handleCors = (req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*')
    next()
}

const port = 8000;
app.use(handleCors)

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

const timeStamp = () => new Date().toLocaleString()

const addClassMethod = (req, res, next) => {
    const className = req.body.name
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
    let studentObj = req.body
    let classname = req.params.classname;

    let arr = mySchool['classes'][classname]['students'];

    arr.filter(el => {
        console.log('hello    ' + el['name'])
        el['name'] === studentObj.name
    })
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

app.post('/class/:classname/enroll', enrollClass)


const getStudentsByClass = (req, res, next) => {
    let classname = req.params.classname;

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