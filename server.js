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

const printStudents = (req, res, next) => {
    console.log(mySchool.students)
    res.json(mySchool.students)

}

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

    // console.log(addedClass)
    // res.json(addedClass);
    mySchool.enrollStudent(currentClass, student, city, age, grade)
    res.json({
        "student": mySchool.classes[currentClass].students,
        "className": currentClass,
        "message": "Enrolled a new student in class",
        "timestamp": date
    })
}

app.get('/Classes', printClasses);

app.get('/Students', printStudents);

app.post('/Class', newClass);

app.post('/class/:className/enroll', assignStudent)

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})