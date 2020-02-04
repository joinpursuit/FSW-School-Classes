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

const checkClass = (req, res, next) =>{
    let subject = mySchool.classes[req.body.class];
    if(!subject){
        next()
    }else{
        res.status(400).json({
            error:"This class already exists",
            timestamp: new Date().toString()
        })
    }
}

app.post("/class", checkClass, (req, res)=>{
    try{

        let newSubject = mySchool.addClass(req.body.class, req.body.teacher);
        res.status(200).json({
            class: newSubject,
            message: "You have created a new class",
            timestamp: new Date().toString()
        })
    }catch(err){
        res.status(400).json({
            error: "Please fill out all the information required",
            timestamp: new Date().toString()
        })
    }
})

const test = ( req, res, next )=>{
    console.log("middle Hit")
    if(req.query.failing < 70 || req.query.city){
        let fallingCities = mySchool.getStudentsByClassWithFilter(req.params.className, req.query.failing, req.query.city);
        res.status(200).json({
            students: fallingCities,
            message: "this is the list of failing students and cities",
            timestamp: new Date().toString()
        });
    }
    next();
}

const checkForStudents = (req, res, next) =>{
    let verifyStu = mySchool.classes.physics.students;
    console.log(req.body, req.params)
    verifyStu.forEach(student =>{
        if(student.name === req.body.name){
            res.status(400).json({
                error:"This student already exists",
                timestamp: new Date().toString()
            })
        }else{
            next();
        }
    })
}

app.post("/class/:className/enroll", checkForStudents, (req, res)=>{

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
        res.status(400).json({
            error: "this class does not exist",
            timestamp: new Date().toString()
        })
    }

});

app.get("/class/:className/students", test, (req, res)=>{

    try{
        let allStudents = mySchool.getStudentsByClass(req.params.className);
        res.status(200).json({
                students: allStudents,
                message: "Retrived Students",
                timestamp: new Date().toString()
        })
    }catch(err){

        res.status(400).json({
            message: "this class does not exist",
            timestamp: new Date().toString(),
            test: req.test
        })

    }
})


app.listen(port,() =>{
    console.log("Listening to port " + port)
})