const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const School = require("./School")
let newSchool = new School();
const timeStamp = new Date();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const allClasses = (req,res) => {
    res.json(newSchool);
}

const classCheck = (req, res, next) => {
    if(newSchool[classes][req.body.name]){
        res.json({
            error:" Info either has already been submited or missing sections",
            timeStamp:timeStamp.toString(Date.now())
        })
    }else{
        next();
    }

}

const checkStudent = (req, res, next) => {
    let enrolledStudents = newSchool[classes][`${req.params["className"]}`]["students"];
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
    newSchool.addClass(req.body.name, neq.body.teacher);
    res.json({
        class:{ "name": req.body.name, "teacher": req.body.teacher, "students": []},
        message: "Added a new class",
        timestamp: timeStamp.toString(Date.now())
    })
}

const addNewStudent = (req, res) => {
    newSchool.enrollStudent(req.params["className"], req.body);
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
    } else if(newSchool["classes"][className]){
        console.log("hello")
        res.json({
            "students": newSchool.getStudentsByClass(className),
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
app.post("/class", classCheck, addNewClass);
app.post("/class/:className/enroll", checkStudent, addNewStudent);
app.get("/class/:className/students", displayStudents);

app.listen(port, () => {
    console.log(`The server is running on port ${port}`);
  });