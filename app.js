const School = require('./School.js');
const Student = require('./Student.js');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const port = 4000;
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


// const classRouter = require("./Class.js");
// const schoolRouter = require("./School.js");
// const studentRouter = require("./Student.js");

// app.use("/class", classRouter);
// app.use("/School", schoolRouter);
// app.use("/Student", studentRouter);

let mySchool = new School();

app.get("/", (req, res) => {
    try{
        res.json(mySchool);
    } catch(error) {
        console.log(error);
    }
});

app.post("/class", (req, res) => {
    try {
        mySchool.addClass(req.body.name, req.body.teacher);
        res.json({ 
            "class": { "name": req.body.name, "teacher": req.body.teacher, "students": []},
            "message": "Created a new class",
            "timestamp": "YYYY, MM/DD HH:MM:SS"
          })
    } catch(error) {
        res.json({ 
            "error": "Please fill out all the information or Class already exists",
            "timestamp": "YYYY, MM/DD HH:MM:SS"
          });
    };
});

app.post("/class/:className/enroll", (req, res) => {
    try {
        mySchool.enrollStudent(req.params.className, req.body.name);
        res.json({
                "student": { "name": req.body.name, "age": req.body.age, "city": req.body.city, "grade": req.body.grade },
                "className": req.params.className,
                "message": "Enrolled Student",
                "timestamp": "YYYY, MM/DD HH:MM:SS"
        });
    } catch(error) {
        res.json({
            "error": "Please fill out all the information for the student",
            "timestamp": "YYYY, MM/DD HH:MM:SS"
        })
    }
});

app.get("/:className/students", (req, res) => {
    try {
        mySchool.getStudentsByClassWithFilter(req.body.name, req.body.failing, req.body.city);
        res.json({
            "students": [
            { "name": req.body.name, "age": req.body.age, "city": req.body.city, "grade": req.body.grade },
            { "name": "Emily", "age": 28, "city": "LA", "grade": 80 }
            ],
            "message": "Retrieved Students",
            "timestamp": "YYYY, MM/DD HH:MM:SS"
        });
    } catch(error) {
        res.json({
            "error": `Class ${req.body.class} doesn't exist.`,
            "timestamp": "YYYY, MM/DD HH:MM:SS"
        });
    };
});

app.listen(port, () => {
    console.log("Listening on port: ", port);
})