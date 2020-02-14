const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;
const School = require("./School");
const Student = require("./Student");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let mySchool = new School();

// Create a Class w/ Course Name and Teacher
app.post("/class", (req, res) => {
    try {
        let className = req.body.name;
        let classTeacher = req.body.teacher;
        mySchool.addClass(className, classTeacher);
        res.status(200).json({
            class: {className,classTeacher,students: []},
            status: "success",
            message: "new class added"
        });
    } catch (err) {
        console.log(err)
    }
})

// Get Entire List of Classes
app.get("/class", (req, res) => {
    try{
        res.status(200).json(mySchool)
    } catch (err) {
        console.log(err)
    }
})

// Add student to class
app.post("/class/:className/enroll", (req, res)=> {
    try {
        let newStudent = new Student(req.body.name, req.body.age, req.body.city, req.body.grade);
        let addStudent = mySchool.addStudent(req.params.className, newStudent);
        res.status(200).json({
            student: addStudent,
            status: "success",
            message: "student added to class"
        })
    } catch (err) {
        console.log(err)
    }
})

// List students by class
app.get("/class/:className/students", (req, res)=> {
    try {
        res.status(200).json(mySchool.getStudentsByClass(req.params.className));
    } catch (err) {
        console.log(err)
    }
})

app.listen(port, () => console.log("You're on port", port))