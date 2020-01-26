const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser")
const timestamp = require('time-stamp');// ex . timestamp: req.timestamp
const School = require('./School')
const Student = require('./Student')

const port = 3000;

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// app.use(time);

let myschool = new School();

const middleWareA = (req,res, next) => {
    let studSample = new Student(req.body.name, req.body.age, req.body.city, req.body.grade)
    let students = myschool.enrollStudent(req.params.className.toLocaleUpperCase(), studSample)
    if(students){
        res.json({ 
            "student": students,
            "className": req.params.className.toLocaleUpperCase(),
            "message": "Enrolled Student",
            "timestamp": timestamp.utc('YYYY, MM/DD HH:mm:ss')
          })
        console.log("Middleware A has been fired");
    } else {
        res.json({ 
            "error": "Please fill out all the information for the student",
            "timestamp": timestamp.utc('YYYY, MM/DD HH:mm:ss')
          })
    }
}

app.get("/", (req, res) => {
    console.log(myschool.classes)
    res.json("Hello Wellcome to Jay World ")
    
})
app.post("/class/:className/enroll/", middleWareA, (req, res) => {

    res.json("Updating class enrollment")
})

app.post("/class/:name/:teacher", (req, res) => {
    let className = req.params.name
    let nClass = myschool.addClass(className.toLocaleUpperCase(), req.params.teacher);
    // console.log(myschool.classes)
    if(nClass){
        res.json({ 
            "class": nClass,
            "message": "Created a new class",
            "timestamp": timestamp.utc('YYYY, MM/DD HH:mm:ss'),
          })
    } else {
        res.json({ 
            "error": "Please fill out all the information or Class already exists",
            "timestamp": timestamp.utc('YYYY, MM/DD HH:mm:ss')
          })
    }
})


app.get("/class/:className/students", (req, res) => {
    let className = req.params.className.toUpperCase()
    let sClass = myschool.getStudentsByClass(className)
    // console.log(myschool.getStudentsByClass(req.params.className))
    if(sClass){
        res.json({
            "students": sClass,
            "message": "Retrieved Students",
            "timestamp": timestamp.utc('YYYY, MM/DD HH:mm:ss')
          })
    } else {
        res.json({ 
            "error": `Class ${className} doesn't exist.`,
            "timestamp": timestamp.utc('YYYY, MM/DD HH:mm:ss')
          })
    }
})

app.listen(port, () => {
    console.log("listening on port: ", port)
});



