const express = require("express");
const cors =  require("cors");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;
const School = require("./backend/School");

let mySchool = new School();

// middleware things
const classExists = (req, res, next) => {
    if(!this.classes[className]){
        res.json({
            "message": "No students retrieved",
            "timestamp": "YYYY, MM/DD HH:MM:SS"
        })
        next();
      }
}

//app.use
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

// routes

app.post("/class", (req, res, next) => {
    try {
        let newClass = mySchool.addClass(req.body.name, req.body.teacher)
        res.json({
            newClass,
            "message": "Successfully created a class",
            "timestamp": "YYYY, MM/DD HH:MM:SS"
        })
    } catch (error) {
        next (error)
    }
     res.json("Added a class!")
});


app.post("/class/:className/enroll", (req, res, next) => {
    try {
        let enrolled = mySchool.enrollStudent(req.params.className, req.body.student)
        res.json({
            enrolled,
            "message": "Successfully enrolled a create in a class..",
            "timestamp": "YYYY, MM/DD HH:MM:SS"
        })         
    } catch (error) {
        next (error)  
    }
})

app.get("/class/:className/students", (req, res, next) => {
    try {
        let students = mySchool.getStudentsByClass(req.params.className)
        res.json({
            students,
            "message": "Got all Students",
            "timestamp": "YYYY, MM/DD HH:MM:SS"
            })  
    } catch (error) {
        next (error)     
    }
})


app.listen(port, () => {
    console.log(`Listening on Port ${port}`)
});