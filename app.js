const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const School = require("./School")
const port = 3000;

let mySchool = new School();
// let approvedMessage = {message: "Created a new class", timestamp: "Todays Date"}

app.use(cors());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post("/class", (req, res) => {
    let addClass = req.body
    // addClass[student] = [];
    let keys = Object.keys(mySchool.classes)
    console.log(keys);
    if(keys.includes(req.body.name)) {
        res.json({
            error: "Please fill out all the information or Class already exists",
            timestamp: "YYYY, MM/DD HH:MM:SS"
        })
    }else {
        mySchool.classes[req.body.name] = req.body
        // mySchool.classes[req.body.name]["students"] = []
        console.log(mySchool.classes)
        res.json({
            addClass,
            message: "Created a new class",
            timestamp: "YYYY, MM/DD HH:MM:SS"
        })
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
    // console.log(req.params["className"])
    student = req.body
    let className = req.params.className
    // let studentName = req.body.name
    let keys = Object.keys(mySchool.classes)
    mySchool.enrollStudent(className, student)
    // console.log(mySchool.classes);
    // console.log(keys);
    //add example class and console log the classes to find out how to access the objects in the class
    //also check to see if add class still works 
    //check keys as well
    
    // mySchool.classes[className]["students"].push()
    // mySchool.classes[className]["students"].forEach((student, i) => {
    //     if(student.name = studentName){
    //         mySchool.classes[className]["students"][i] = req.body
    //     }
    // });

    if(keys.includes(className)) {

        res.json({
            error: "Please fill out all the information for the student",
            timestamp: "YYYY, MM/DD HH:MM:SS"
        })
    } else {
        req.body
        res.json({
            addClass,
            message: "Created a new class",
            timestamp: "YYYY, MM/DD HH:MM:SS"
        })
    }

})

app.get('/class/:className/students', (req,res) => {
    mySchool.classes[mySchool.addClass("math", "brandon")]
    let className = req.params.className
    res.send(mySchool.classes[className]["students"])

})


app.listen(port, () => {
    console.log("Listening to port: " + port)
})

