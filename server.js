const express = require('express');
let bodyParser = require('body-parser');
const port = 1337;
const app = express();
const cors = require('cors');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(cors());

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
    
    mySchool.addClass(className, teacherName)
    console.log('Created Class', mySchool)

    res.json({
                "class": mySchool.classes[className],
                // "teacher": mySchool.classes[teacherName],
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

    // let currentClass = req.params.className;
    let className = req.body.name;
    let student = req.body.studentname
    let city = req.body.city
    let age = req.body.age
    let grade = req.body.grade
    
    // console.log("What is this", className);
    // console.log('Student23235234', student)
    // console.log('city', city)
    // console.log('age', age)
    // console.log('grade', grade)

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
    mySchool.enrollStudent(className, student, city, age, grade)

    let studentArray = mySchool.classes[className].students;
    let end = studentArray.length - 1;

    // console.log("Checking Names ", studentArray)
    res.json({
        "student": studentArray[end],
        "className": className,
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

    // let currentClass = req.params.className;
    let className = req.body.name;
    // console.log("What is this", className);
    let studentsList = mySchool.getStudentsByClass(className);
    let queryStatus = req.query;

    for(let key in mySchool.classes){
        if(className !== mySchool.classes[key].name){
            // console.log("Error", mySchool.classes[key].name);
            res.json({ 
                "error": `Class ${className} doesnt exists`,
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