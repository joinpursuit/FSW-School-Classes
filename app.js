const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const School = new School();
const timeStamp = new Date();

app.use(cors());
app.use(bosyParser.urlcoded({extended: false}));
app.use(bodyParser.json());

const allClasses = (req,res) => {
    res.json(School);
}

const classCheck = (req, res, next) => {
    if(School[classes][req.body.name]){
        res.json({
            error:" Info either has already been submited or missing sections",
            timeStamp:timeStamp.toString(Date.now())
        })
    }else{
        next();
    }

}

const checkStudent = (req, res, next) => {
    let enrolledStudents = School[classes][`${req.params["className"]}`]["students"];
    for(let i = 0; i < enrolledStudents.length; i++){
        if(enrolledStudents[i]["name"] === req.body.name){
            res.json({
                error:"Fill out the student info",
                timestamp: timeStamp.toString(Date.now())
            })
            return
        }
    }
    next()
}

const addNewClass = (req, res) => {
    School.addClass(req.body.name, neq.body.teacher);
    res.json({
        class:{ "name": req.body.name, "teacher": req.body.teacher, "students": []},
        message: "Added a new class",
        timestamp: timeStamp.toString(Date.now())
    })
}

const addNewStudent = (req, res) => {
    mySchool.enrollStudent(req.params["className"], req.body);
    res.json({
        student:{ "name": req.body.name, "age": req.body.age, "city": req.body.city, "grade": req.body.grade },
        className:req.params["className"],
        message:"Enrolled a new Student",
        timeStamp:timeStamp.toString(Date.now())
    })
}

const displayStudents = (req, res) => {
    let className = req.params["className"];
    let failing = (req.query["failing"]);
    let city = req.query["city"];
    if(failing === 'true' || city){
        console.log("wrong route")
        console.log(failing)
        console.log(city)
        res.json({
            "students": School.getStudentsByClassWithFilter(className, failing, city),
            "message": "Retrieved Filtered Students",
            "timestamp": timeStamp.toString(Date.now())
        })
    } else if(mySchool["classes"][className]){
        console.log("hello")
        res.json({
            "students": School.getStudentsByClass(className),
            "message": "Retrieved Students",
            "timestamp": timeStamp.toString(Date.now())
        }) 
    } else {
        res.json({ 
            "error": `Class ${className} doesn't exist.`,
            "timestamp": timeStamp.toString(Date.now())
        })
    }
}

app.get("/", allClasses);
app.post("/class", checkClass, addNewClass);
app.post("/class/:className/enroll", checkStudent, addNewStudent);
app.get("/class/:className/students", displayStudents);