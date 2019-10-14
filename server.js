const express = require('express');
const cors = require('cors');
const body = require('body-parser');
const axios = require('axios');

const School = require('./School');
const Student = require('./Student');
const Class = require('./Class');

const app = express();

app.use(cors());
app.use(body.urlencoded({
    extended: false
}));

let mySchool = new School();

const validInput = (req, res, next) => [...Object.values(req.body)].every(ele => ele) ? next() : sendError(res, 'Invalid Input');

const timeStamp = () => new Date();

const sendError = (res, msg) => res.json({
    error: msg
});

const classExists = (req, res, next) => !!mySchool['classes'][req.body.name] ? sendError(res, 'Class already Exists') : next();

const addNewClass = (req, res, next) => {
    mySchool.addClass(req.body.name, req.body.teacher);
    res.json({
        class: mySchool['classes'][req.body.name],
        message: 'Created a new class',
        timestamp: timeStamp()
    })
}

const sendSchoolInfo = (req, res, next) => res.send(mySchool);

const addNewStudent = (req, res, next) => {
    mySchool['classes'][req.params['classname']]['students'].push(req.body.student);
    res.json({
        student: 
        message: 'Created a new class',
        timestamp: timeStamp()
    })
}

const studentAlreadyEnrolled = (req, res, next) => mySchool['classes'][req.params['classname']]['students'].includes(req.body.student) ? sendError(res, 'Student already enrolled') : next();

// Getting all school information
app.get('/', sendSchoolInfo);

// Creating a new class
app.post('/class', validInput, classExists, addNewClass);

// Enrolling students in class
app.post('/class/:classname/enroll', validInput, classExists, studentAlreadyEnrolled, addNewStudent);

const port = 8000;

app.listen(port, () => {
    console.log(`Live at http://localhost:${port}`);
})