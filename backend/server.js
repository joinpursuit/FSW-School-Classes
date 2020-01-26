const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const School = require('./School')
let mySchool = new School();
let timestamp = new Date();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const allClasses = (req, res) => {
    res.json(mySchool);
}

const checkClass = (req, res, next) => {
    if(mySchool["classes"][req.body.name]){
        res.json({
            error: "Please fill out all the information or Class already exists",
            timestamp: timestamp.toString(Date.now())
        })
    } else {
        next();
    }
}

const checkStudent = (req, res, next) => {
    let studentsList = mySchool["classes"][`${req.params["className"]}`]["students"];
    for(let i = 0; i < studentsList.length; i ++){
        if(studentsList[i]["name"] === req.body.name){
                res.json({
                "error": "Please fill out all the information for the student",
                "timestamp": timestamp.toString(Date.now())
            })
            return;
        }
    }
    next();
}

const addNewClass = (req, res) => {
    mySchool.addClass(req.body.name, req.body.teacher);
    res.json({ 
        "class": { "name": req.body.name, "teacher": req.body.teacher, "students": []},
        "message": "Created a new class",
        "timestamp": timestamp.toString(Date.now())
      })
}

const addNewStudent = (req, res) => {
    mySchool.enrollStudent(req.params["className"], req.body);
    res.json({ 
        "student": { "name": req.body.name, "age": req.body.age, "city": req.body.city, "grade": req.body.grade },
        "className": req.params["className"],
        "message": "Enrolled Student",
        "timestamp": timestamp.toString(Date.now())
      })
}

// displaying students, getting the grades
const displayStudents= (req, res) => {
    // console.log(req.params)
    let studentsList = mySchool["classes"][`${req.params["className"]}`]["students"]
    res.json(studentsList)
}

app.get("/", allClasses);
app.post("/class", checkClass, addNewClass);
//Double check the add new student, cannot test as I have not create a student class yet
app.post("/class/:className/enroll", checkStudent, addNewStudent);
app.get("/class/:className/students/", displayStudents);
//req.query is an object that can be keyed into and find the values of
// /class/physics/students/?failing=(true)&city=(nyc)



app.listen(port, () =>{console.log("Listening to port")});