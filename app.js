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

const enrollStu = (req,res, next) => {
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

const getStudents = (req,res, next) => {
    let className = req.params.className.toUpperCase()
    let sClass = myschool.getStudentsByClassWithFilter(className,true,"BK")
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
}

app.get("/", (req, res) => {
    console.log(myschool.classes)
    res.json({Message : "Hello Welcome to Jay School ",
               Classes:  myschool.classes
                })
    
})
app.post("/class/:className/enroll/", enrollStu, (req, res) => {

    res.json("Updating class enrollment")
})

app.post("/class/:name/:teacher", (req, res) => {
    let className = req.params.name
    let nClass = myschool.addClass(className.toLocaleUpperCase(), req.params.teacher);
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


app.get("/class/:className/students", getStudents,(req, res) => {
    
})

app.listen(port, () => {
    console.log("listening on port: ", port)
});



