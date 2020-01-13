const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const School = require("./classes/School.js");

const port = 3000;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); 

let mySchool = new School();

app.post("/class", (req, res) => {
    if(!mySchool.addClass(req.body.name.toLowerCase(), req.body.teacher.toLowerCase())) {
        res.json({
            error: "Please fill out all the information or Class already exists",
            "timestamp": new Date()
        })
    } else {
        res.json({
            class: req.body,
            message: "created a new class",
            timestamp: new Date().toString()
        })
    }
})

app.post("/class/:className/enroll", (req, res) => {
    let userClass = req.params.className.toLowerCase();

    if(!mySchool.enrollStudent(userClass, req.body)) {
        res.json({
            error: "Please fill out all the information for the student",
            timestamp: new Date().toString()
        })
    } else {
        res.json({ 
            student: req.body,
            className: userClass,
            message: "Enrolled Student",
            timestamp: new Date().toString()
        })
    }
})

app.get("/class/:className/students", (req, res) => {
    let currClass = req.params.className.toLowerCase();
    
    if(mySchool.classes[currClass]) {
        res.json({
            students: mySchool.classes[currClass].students,
            message: "Retrieved students",
            timestamp: new Date().toString()
        }) 
    } else {
        res.json({
            error: `Class ${currClass} doesn't exist.`,
            timestamp: new Date().toString()
        })
    }
})

app.get("/class", (req,res) => {
    res.json(mySchool.classes);
})

app.listen(port, () => console.log("Listening on port", port));