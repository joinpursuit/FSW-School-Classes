const express = require('express');
let bodyParser = require('body-parser');
const port = 1337;
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

const School = require('./School.js')
let mySchool = new School();


const printClasses = (req, res, next) => {
    console.log(mySchool.classes);
    res.json(mySchool.classes)
}

// const printStudents = (req, res, next) => {
//     console.log(mySchool.students)
//     res.json(mySchool.students)

// }

const newClass = (req, res, next) => {
    let today = new Date();
    let date = today.getFullYear() + ', ' +
        (today.getMonth()+1) + '/' + 
         today.getDate() + ' ' + 
         today.getHours() + ":" + 
         today.getMinutes() + ":" + 
         today.getSeconds();

    let className = req.body.name;
    let teacherName = req.body.teacher;
    // if(!mySchool.Classes)
    for(let key in mySchool.classes){
        if(className === key){
            console.log("Error");
            res.json({ 
                "error": "Please fill out all the information or Class already exists",
                "timestamp": date
              })
            return;
        }
    }
    console.log('works')
    mySchool.addClass(className, teacherName)

    res.json({
                "class": mySchool.classes[className],
                "message": "Created a new class",
                "timestamp": date
            })
    return;
}

const assignStudent = (req, res, next) => {
    let today = new Date();
    let date = today.getFullYear() + ', ' +
        (today.getMonth()+1) + '/' + 
         today.getDate() + ' ' + 
         today.getHours() + ":" + 
         today.getMinutes() + ":" + 
         today.getSeconds();

    let currentClass = req.params.className;
    let student = req.body.studentname
    let city = req.body.studentcity
    let age = req.body.studentage
    let grade = req.body.studentgrade

    if(!student || !city || !age || !grade){
        console.log("Error");
        res.json({ 
            "error": "Please fill out all the information for the Student",
            "timestamp": date
          })
        return;
    }

    // console.log(addedClass)
    // res.json(addedClass);
    mySchool.enrollStudent(currentClass, student, city, age, grade)

    let studentArray = mySchool.classes[currentClass].students;
    let end = studentArray.length - 1;

    res.json({
        "student": studentArray[end],
        "className": currentClass,
        "message": "Enrolled a new student in class",
        "timestamp": date
    })
}

const findStudents = (req, res, next) => {
    let today = new Date();
    let date = today.getFullYear() + ', ' +
        (today.getMonth()+1) + '/' + 
         today.getDate() + ' ' + 
         today.getHours() + ":" + 
         today.getMinutes() + ":" + 
         today.getSeconds();

    let currentClass = req.params.className;
    let studentsList = mySchool.getStudentsByClass(currentClass);
    let queryStatus = req.query;

    for(let key in mySchool.classes){
        if(currentClass !== mySchool.classes[key].name){
            // console.log("Error", mySchool.classes[key].name);
            res.json({ 
                "error": `Class ${currentClass} doesnt exists`,
                "timestamp": date
              })
            return;
        }
    }

    if(queryStatus.failing === 'true') {
        let failingStudents = [];
        console.log('First option', queryStatus.failing)

        for(let i = 0; i < studentsList.length; i++) {
            if(studentsList[i].grade < 70){
                failingStudents.push(studentsList[i])
            }
        }

        res.json({
            failingStudents,
            "message": "List of failing Students",
            "timestamp": date
        })
        return
    } else if (queryStatus.failing === 'false') {
        let passingStudents = [];
        console.log('2nd Option', queryStatus.failing)

         for(let i = 0; i < studentsList.length; i++) {
            if(studentsList[i].grade >= 70){
                passingStudents.push(studentsList[i])
            }
        }

        res.json({
            passingStudents,
            "message": "List of passing Students",
            "timestamp": date
        })
        return
    } else if (queryStatus.city){
        sharedLocations = [];

        for(let i = 0; i < studentsList.length; i++) {

            if(studentsList[i].city === queryStatus.city){
                sharedLocations.push(studentsList[i])
            }
        }

        res.json({
            "Students": sharedLocations,
            "message": `List of students in ${queryStatus.city}`,
            "timestamp": date
        })
    } else {
        // console.log('My Answers', studentsList[0].name);
        res.json({
            "Students": studentsList,
            "message": "Retrieved Students",
            "timestamp": date
        })
    }
}

app.get('/Classes', printClasses);

// app.get('/Students', printStudents);

app.post('/Class', newClass);

app.post('/class/:className/enroll', assignStudent);

app.get('/class/:className/students', findStudents);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})