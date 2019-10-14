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
mySchool.addClass("Chemistry", "JRJ")
mySchool.addClass("Calculus", "Alejo")
mySchool.addClass("Biology", "Voniel")

mySchool.enrollStudent("steve", 30, 'NY', 75)

// console.log("hello ", mySchool.getStudentsByClass("Chemistry"));
// console.log(mySchool.enrollStudent("Chemistry", 'Steve'));

const addClassMethod = (req, res, next) => {
    const classInfo = req.body
    let time = new Date();

    // let response = mySchool.addClass(classInfo.name, classInfo.teacher)
    res.send({
        class: mySchool.addClass(classInfo.name, classInfo.teacher),
        message: "Created a new class",
        timeStamp: time.toLocaleString()
    })
    next()
}

const validateClass = (req, res, next) => {
    let classInfo = req.body;

    classInfo.name ? res.json({
        error: 'username already exist'
    }) : next()
}

app.post('/class', addClassMethod, validateClass)
// => {
//     // console.log('req.body', req.body);
//     // res.send(`welcome ${req.body.email}`)
// })

app.listen(3000, () => {
    console.log('Running at http://localhost:3000/');

})