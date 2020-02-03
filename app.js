const express = require("express");
const cors = require("cors");
const port = 3000;
const app = express();
const bodypaser = require("body-parser")
app.use(cors());
app.use(bodypaser.urlencoded({extended: false}));
app.use(bodypaser.json());

const School = require("./School.js");
const Student = require("./Student.js");

let mySchool = new School();

app.post("/class", (req, res)=>{
    try{
        let subject = new Class(
            req.body.name,
            req.body.teacher
        )
        let newSubject = mySchool.addClass(subject);
        res.status(200).json({
            class: newSubject,
            message: "You have created a new class",
            timestamp: new Date().toString()
        })
    }catch(err){
        res.status(200).json({
            error: "Please fill out all the information required",
            timestamp: new Date().toString()
        })
    }
})

app.post("/class/:className/enroll", (req, res)=>{
    try{
        let newStudent = new Student (
            req.body.name,
            req.body.age,
            req.body.city,
            req.body.grade
        )

        let studentInfo = mySchool.enrollStudent(req.params.className, newStudent)
        res.status(200).json({
            student: studentInfo,
            message: "these are the enrolled students",
            timestamp: new Date().toString()
        })

    }catch(err){
        res.status(200).json({
            error: "this class does not exist",
            timestamp: new Date().toString()
        })
    }

});

app.get("/class/:className/students", (req, res)=>{
    try{
        let allStudents = mySchool.getStudentsByClass(req.params.className);
        res.status(200).json({
            students: allStudents,
            message: "Retrived Students",
            timestamp: new Date().toString()
        })
    }catch(err){

        res.status(200).json({
            message: "this class does not exist",
            timestamp: new Date().toString()
        })

    }
})



app.listen(port,() =>{
    console.log("Listening to port " + port)
})