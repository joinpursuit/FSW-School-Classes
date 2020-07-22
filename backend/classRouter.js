const express = require('express');
const router = express.Router();
const School = require('./School.js')

const mySchool = new School();
mySchool.addClass('Geometry', 'Mr. Xia')
mySchool.addClass('Art', 'Ms.Susan')
mySchool.enrollStudent('Geometry', { name: 'Ashley', age: 15, city: 'New York', grade: 77 })
mySchool.enrollStudent('Geometry', { name: 'Ashley', age: 15, city: 'Chicago', grade: 71 })
mySchool.enrollStudent('Geometry', { name: 'patty', age: 15, city: 'Chicago', grade: 55 })
mySchool.enrollStudent('Geometry', { name: 'julia', age: 15, city: 'New York', grade: 1 })

//gets arr of classes
router.get('/', (req, res) => {
    let classes = mySchool.classes
    res.send(classes)
})

//creates new class
router.post('/', (req, res) => {
    let className = req.body.name
    let teacher = req.body.teacher
    let time = new Date();
    if (!mySchool.classes[className]) {
        let newClass = mySchool.addClass(className, teacher)
        res.json({
            classes: newClass,
            message: 'Created new class',
            timestamp: time.toISOString()
        })
    } else {
        res.status(404)
        res.json({
            'error': 'Please fill out all the information or Class already exists',
            'timestamp': time.toISOString()
        })
    }
})


//fn to enroll new student
const enrollNewStudent = (req, res, next) => {
    let className = req.params.className
    const { name, city, age, grade } = req.body
    let time = new Date();
    let student = {
        name,
        age,
        city,
        grade
    }
    let studentExists = false

    if (!mySchool.classes[className]) {
        next();
    }

    let classArr = mySchool.classes[className].students
    if (classArr.length === 0) {
        let newStudent = mySchool.enrollStudent(className, student)
        res.json({
            student: newStudent,
            className: mySchool.classes[className],
            message: 'Enrolled Student',
            timestamp: time.toISOString()
        })
    } else {
        for (let i = 0; i < classArr.length; i++) {
            if (classArr[i].name === name) {
                studentExists = true
                next();
            }
        }

        if (!studentExists) {
            let newStudent = mySchool.enrollStudent(className, student)
            res.json({
                student: newStudent,
                className: mySchool.classes[className],
                message: 'Enrolled Student',
                timestamp: time.toISOString()
            })
        }
    }
}

//updates student info
const updateStudent = (req, res, next) => {
    let className = req.params.className
    const { name, city, age, grade } = req.body
    let time = new Date();
    let student = {
        name,
        age,
        city,
        grade
    }

    if (!mySchool.classes[className]) {
        next();
    } else if (!name || !city || !age || !grade || !className) { // check if any of these values are empty - throw error
        next();
    } else {
        let classArr = mySchool.classes[className].students
        for (let i = 0; i < classArr.length; i++) {
            if (classArr[i].name === name) {
                classArr.splice(i, 1) //index, # elements being removed, replace with student obj
                let updatedStudent = mySchool.enrollStudent(className, student)
                res.json({
                    student: updatedStudent,
                    className: className,
                    message: 'Student info has been updated',
                    timestamp: time.toISOString()
                })
            }
        }
    }
}

//throws error abut student
const studentError = (req, res, next) => {
    let time = new Date();
    res.json({
        'error': 'Please fill out all the information for the student',
        'timestamp': time.toISOString()
    })
}

// enrolling students in class and updates info
router.post('/:className/enroll', enrollNewStudent, updateStudent, studentError)
const doesClassExist = (req, res, next) => {
    const className = req.params.className
    if (mySchool.classes[className]) {
        next();
    } else {
        let time = new Date();
        res.json({
            'error': 'Class does not exist',
            'timestamp': time.toISOString()
        })
    }

}

const getStudentByClass = (req, res, next) => {
    const city = req.query.city
    const failing = req.query.failing
    const className = req.params.className
    let time = new Date();

    if (city || failing) {
        next();
    } else {
        let studentsByClass = mySchool.getStudentsByClass(className)
        res.json({
            students: studentsByClass,
            message: "Retrieved Students",
            timestamp: time.toISOString()
        })
    }
}

const getStudentsByClassWithFilter = (req, res, next) => {
    const city = req.query.city
    const failing = req.query.failing
    const className = req.params.className
    let time = new Date();
    let filteredClass;

    if (failing === 'true' && city) {
        filteredClass = mySchool.getStudentsByClassWithFilter(className, true, city)
    } else if (failing === 'false' && city) {
        filteredClass = mySchool.getStudentsByClassWithFilter(className, false, city)
    } else if (failing === 'true') {
        filteredClass = mySchool.getStudentsByClassWithFilter(className, true)

    } else if (failing === 'false') {
        filteredClass = mySchool.getStudentsByClassWithFilter(className, false)
    } else if (city) {
        filteredClass = mySchool.getStudentsByClassWithFilter(className, null, city)
    }

    res.json({
        students: filteredClass,
        message: "Retrieved Students",
        timestamp: time.toISOString()
    })
}
router.get('/:className/students', doesClassExist, getStudentByClass, getStudentsByClassWithFilter)

module.exports = router;