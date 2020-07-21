const school = require('./School');
const Student = require('./Student')

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const port = 3000;
let app = express();

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}));

app.listen(port, () => {
    console.log("listening on port :", port);
})


let mySchool = school;

const log = (request, response, next) => {
    console.log('\nURL', request.url)
    console.log("Queries", request.query)
    console.log("body", request.body, "\n")
    console.log("body.name", request.body, "\n")

    next();
}

const checkAddClassBody = (request, response, next) => {
    if (!request.body.name || !request.body.teacher) {
        response.json({
            error: 'Please fill out all the information',
            timestamp: new Date()
        })
    } else {
        next();
    }
}

const checkExistingClass = (request, response, next) => {
    let className = (request.body.name).toLowerCase();

    if (mySchool.classes[className]) {
        response.json({
            error: 'Class already exists',
            timestamp: new Date()
        })
    } else {
        next();
    }
}

const addTheClass = (request, response) => {
    let addedClass = mySchool.addClass(request.body.name, request.body.teacher);
    if (addedClass === -1) {
        response.json({
            error: 'Class already exists',
            timestamp: new Date()
        })
    } else {
        response.json({
            class: addedClass,
            message: 'Created a new class',
            timestamp: new Date()
        })
    }
}


const checkEnrollStudentBody = (request, response, next) => {
    if (!request.body.name 
        || !request.body.age 
        || isNaN(parseInt(request.body.age))
        || !request.body.city 
        || !request.body.grade
        || isNaN(parseInt(request.body.grade))) {
            response.json({
                error: 'Please fill out all the information, Grade and Age have to be a numbers',
                timestamp: new Date()
            })
    } else {
        next();
    }
}

const checkIfClassExist = (request, response, next) => {
    let className = (request.params.class_name).toLowerCase();

    if (!mySchool.classes[className]) {
        response.json({
            error: `Class ${className} doesn't exists`,
            timestamp: new Date()
        })
    } else {
        next();
    }
}


const enrollTheStudent = (request, response) => {
    let name = (request.body.name).toLowerCase();
    let age = parseInt(request.body.age);
    let city = (request.body.city).toLowerCase();
    let grade = parseInt(request.body.grade);

    let className = (request.params.class_name).toLowerCase();

    let newStudent = new Student(name, age, city, grade, className)
    let enrolledStudent = mySchool.enrollStudent(className, newStudent);

    if (enrolledStudent === -1) {
        response.json({
            error: `Class ${className} doesn't exist...`,
            timestamp: new Date()
        })
    } else if (enrolledStudent === -2) {
        response.json({
            error: `Missing student information`,
            timestamp: new Date()
        })
    } else if (enrolledStudent === -3) {
        response.json({
            error: `Wrong input form, age and grad have to be numbers`,
            timestamp: new Date()
        })
    } else {
        response.json({
            student : enrolledStudent,
            class: className,
            message: 'Enrolled Student',
            timestamp: new Date()
        })
    }
}




const getStudent = (request, response) => {
    let className = (request.params.class_name).toLowerCase();
    let failing = (request.query.failing).toLowerCase();
    let city = (request.query.city).toLowerCase();

    if (failing === 'true') {
        failing = true;
    } else {
        failing = false;
    }

    let filteredStudents = [];

    if (!failing && !city) {
        filteredStudents = mySchool.getStudentsByClass(className);
    } else {
        filteredStudents = mySchool.getStudentsByClassWithFilter(className, failing, city);
    }


    if (filteredStudents === -1) {
        response.json({
            error: "Class doesn't exists",
            timestamp: new Date()
        }) 
    } else if (!filteredStudents.length) {
        response.json({
            message: "No match to your request",
            timestamp: new Date()
        })
    } else {
        response.json({
            students: filteredStudents,
            message: "Retrieved Students",
            timestamp: new Date()
        }) 
    }
}

// Creating a new class
app.post('/class', log, checkAddClassBody, checkExistingClass, addTheClass);

// Enrolling students in a class 
app.post('/class/:class_name', log, checkEnrollStudentBody, checkIfClassExist, enrollTheStudent)

// List all students enrolled in a Class
app.get('/class/:class_name/students', log, checkIfClassExist, getStudent)

