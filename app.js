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
    // addClass returns false if the information is incorrect/class exists
    // Checking if addClass returns false, if it does an error is sent
    if(!mySchool.addClass(req.body.name, req.body.teacher)) {
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
    let className = req.params.className;

    // enrollStudent returns false if student information is incorrect
    // Checking if false is returned, if it is then an error is sent
    if(mySchool.classes[className]) {
        mySchool.enrollStudent(className, req.body);
        res.json({ 
            student: req.body,
            className: className,
            message: "Enrolled Student",
            timestamp: new Date().toString()
        })
        
    } else {
        res.json({
            error: `Class ${className} doesn't exist.`,
            timestamp: new Date().toString()
        })
    }
})

app.get("/class/:className/students", (req, res) => {
    let className = req.params.className;
    let city = req.query.city;
    let failing = req.query.failing;
    
    if(mySchool.classes[className]) {
        res.json({
            // If city or failing queries are passed, then WithFilter version of getStudentsByClass runs
            // Otherwise the normal version runs
            students: (city || failing) ? mySchool.getStudentsByClassWithFilter(className, failing, city) : mySchool.getStudentsByClass(className),
            message: "Retrieved students",
            timestamp: new Date().toString()
        }) 
    } else {
        res.json({
            error: `Class ${className} doesn't exist.`,
            timestamp: new Date().toString()
        })
    }
})

app.listen(port, () => console.log("Listening on port", port));