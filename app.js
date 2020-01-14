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
mySchool.addClass("physics", "John Brown");
mySchool.enrollStudent("physics", {name: "John Brown", age: 18, city: "NYC", grade: 75})
mySchool.enrollStudent("physics", {name: "John Brow", age: 18, city: "NYC", grade: 69})

app.post("/class", (req, res) => {
    // addClass returns false if the information is incorrect/class exists
    // Checking if addClass returns false, if it does an error is sent
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

    // enrollStudent returns false if student information is incorrect
    // Checking if false is returned, if it is then an error is sent
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
    let city = req.query.city;
    let failing = req.query.failing;
    
    if(mySchool.classes[currClass]) {
        res.json({
            students: (city || failing) ? mySchool.getStudentsByClassWithFilter(currClass, failing, city) : mySchool.getStudentsByClass(currClass),
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

// For testing purposes
app.get("/class", (req,res) => {
    res.json(mySchool.classes);
})

app.listen(port, () => console.log("Listening on port", port));