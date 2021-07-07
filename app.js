const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const School = require("./School")
const Student = require('./Student')
const port = 3000;

let mySchool = new School();
// let approvedMessage = {message: "Created a new class", timestamp: "Todays Date"}

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.post("/class", (req, res) => {
    const { name, teacher } = req.body
    // console.log(req.body);
    let keys = Object.keys(mySchool.classes)
    // console.log("my keys",keys)
    if(keys.includes(name) || name === "" || teacher === "") {
        console.log("Please fill out all the information or Class already exists");
        
        res.json({
            error: "Please fill out all the information or Class already exists",
            timestamp: "YYYY, MM/DD HH:MM:SS"
        })
    }else {
        let newClass = mySchool.addClass(req.body.name, req.body.teacher)
        res.json({
            newClass,
            message: "Created a new class",
            timestamp: "YYYY, MM/DD HH:MM:SS"
        })
        console.log("my classes",mySchool.classes);
    }
})
// app.post('/class/:name/:teacher', (req, res) => {
//     let keys = Object.keys(mySchool.classes)

//     if(keys.includes(req.params.name)){
//             res.send({error: "Please fill out all the information or Class already exists",
//             timestamp: "YYYY, MM/DD HH:MM:SS"})
//         }else {
//             mySchool.classes[mySchool.addClass(req.params.name, req.params.teacher)]
//             mySchool.classes[req.params.name]["message"] = "Created a new class"
//             mySchool.classes[req.params.name]["timestamp"] = "Todays Date"
//             res.send(mySchool.classes) 
//         }
// })
app.post("/class/:className/enroll", (req, res) => {
    // let className = req.params.className
    let values = Object.values(req.body)
    console.log("values", values)
    
    let newStudent = new Student(req.body.name, req.body.age, req.body.city, req.body.grade)
    
    if(values.includes("")) {
        console.log("Please fill out all the information for the student");
        
        res.json({
            error: "Please fill out all the information for the student",
            timestamp: "YYYY, MM/DD HH:MM:SS"
        })
    } else {
        mySchool.enrollStudent(req.params.className, newStudent)
        console.log("classes", mySchool.classes);
        console.log("new student", newStudent)
        
        res.json({
            studentEnrolled: newStudent,
            message: "Enrolled Student",
            timestamp: "YYYY, MM/DD HH:MM:SS"
        })
    }
})

app.get("/class/:className/students", (req,res) => {
    console.log("my body",req.body);
    console.log("my params", req.params.className);
    mySchool.classes[req.params.className].students
    let studentsArr = mySchool.getStudentsByClassWithFilter(req.params.className, req.body.failing, req.body.city)
    
    debugger
    res.json({
        students: studentsArr,
        message: "thank you"
    })
    mySchool.classes[mySchool.addClass("math", "brandon")]
    let className = req.params.className
    res.send(mySchool.classes[className]["students"])

})


app.listen(port, () => {
    console.log("Listening to port: " + port)
})

