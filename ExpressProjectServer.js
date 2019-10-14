const express = require('express')
const bodyParser = require('body-parser')
const School = require('./school.js')
const app = express();
let mySchool = new School();

const handleCors = (req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*')
    next()
}

const port = 3000;
app.use(handleCors)

app.use(bodyParser.urlencoded({
    extended: false
}))

/*
const currentTime = (req, res, next) => {
    let currDate = new Date();
    res.json('TimeStamp', currDate.toLocaleString())
}

app.use(currentTime);*/

// console.log("schools", School)
mySchool.addClass("Chemistry", "JRJ", )
// mySchool.addClass("Calculus", "Alejo")
// mySchool.addClass("Biology", "Voniel")

mySchool.enrollStudent("steve", 30, 'NY', 75)

// console.log("hello ", mySchool.getStudentsByClass("Chemistry"));
// console.log(mySchool.enrollStudent("Chemistry", 'Steve'));

const addClassMethod = (req, res, next) => {
    const classInfo = req.body
    let time = new Date();

    // const response = mySchool.addClass(classInfo.name, classInfo.teacher)
    res.send({
        class: mySchool.addClass(classInfo.name, classInfo.teacher),
        message: "Created a new class",
        timeStamp: time.toLocaleString()
    })
}

const validateClass = (req, res, next) => {
    let classInfo = req.body;

    if (classInfo.name === classInfo.name) {
        next()
    } else {
        res.send({
            error: 'username already exist'
        })
    }
}

app.post('/class', validateClass, addClassMethod)


const enrollClass = (req, res, next) => {
    let classname = req.params.classname;
    let studentObj = req.body
    res.send({
        classname: classname,
        student: mySchool.enrollStudent(classname, studentObj)
    })
}

app.post('/class/:classname/enroll', enrollClass)


app.listen(3000, () => {
    console.log('Running at http://localhost:3000/');

})