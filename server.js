const express = require('express');
const cors = require('cors');
const body = require('body-parser');
const moment = require('moment');

const School = require('./School');

const app = express();

app.use(cors());
app.use(body.urlencoded({
    extended: false
}));

let mySchool = new School();

const validInput = (req, res, next) => [...Object.values(req.body)].every(ele => ele) ? next() : sendError(res, 'Please fill out all the information');

const timeStamp = () => moment().format('YYYY, MM/DD HH:mm:ss');

const sendError = (res, msg) => res.json({
    error: msg
});

const duplicateClass = (req, res, next) => !!mySchool['classes'][req.body.name] ? sendError(res, 'Class already Exists') : next();

const classExists = (req, res, next) => !!mySchool['classes'][req.params.classname] ? next() : sendError(res, 'Class does not Exist');

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
    const enrolledJSON = mySchool.enrollStudent(req.params['classname'], req.body);
    res.json({
        ...enrolledJSON,
        timestamp: timeStamp()
    });
}

const studentAlreadyEnrolled = (req, res, next) => mySchool['classes'][req.params['classname']]['students'].every(ele => ele.name !== req.body.name) ? next() : updateStudent(req, res, next);

// If student already enrolled update it
const updateStudent = (req, res, next) => {
    const {
        name,
        age,
        city,
        grade
    } = req.body;
    mySchool['classes'][req.params['classname']]['students'] = mySchool['classes'][req.params['classname']]['students'].map(ele => ele.name === name ? ele = {
        name,
        age,
        city,
        grade
    } : ele);
    res.json({
        student: {
            name,
            age,
            city,
            grade
        },
        className: req.params.classname,
        message: 'Updated Student\'s information',
        timestamp: timeStamp()
    })
}

const check = (req, res, next) => console.log(!!mySchool['classes'][req.body.name]);

const queryCheck = (req, res, next) => Object.keys(req.query).length ? validQueryCheck(req, res, next) : sendAllStudents(req, res, next);

const validQueryCheck = (req, res, next) => {
    let {failing, city} = req.query;

    if (!failing  && !city || city === '' || failing === '') {
        return res.json({message: 'Invalid query key/value(s)'})
    }

    let students = mySchool['classes'][req.params['classname']]['students'];

    if (failing) {
        if (failing.toLowerCase() != 'true' && failing.toLowerCase() != 'false') {
            return res.json({message: 'Invalid query for failing, the value must be True or False.'});
        } else if (failing.toLowerCase() === 'true') {
            students = students.filter(ele => ele.grade < 70)
        } else if (failing.toLowerCase() === 'false') {
            students = students.filter(ele => ele.grade >= 70)
        }
    }

    if (city) {
        students = students.filter(ele => ele.city.toLowerCase() === city.toLowerCase());
    }

    res.json({
        students,
        message: 'Retrieved Students',
        timestamp: timeStamp()
    })
}

const sendAllStudents = (req, res, next) => {
    res.json({
        students: mySchool['classes'][req.params['classname']]['students'],
        message: 'Retrieved Students',
        timestamp: timeStamp()
    })
}

// Getting all school information
app.get('/', sendSchoolInfo);

// Creating a new class
app.post('/class', validInput, duplicateClass, addNewClass);

// Enrolling students in class
app.post('/class/:classname/enroll', validInput, classExists, studentAlreadyEnrolled, addNewStudent);

// List all students enrolled in a class
app.get('/class/:classname/students', classExists, queryCheck);

const port = 8000;

app.listen(port, () => {
    console.log(`Live at http://localhost:${port}`);
})