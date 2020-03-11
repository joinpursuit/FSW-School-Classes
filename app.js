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
    const { name, teacher } = req.body
    // console.log(req.body);
    let keys = Object.keys(mySchool.classes)
    // console.log("my keys",keys)
    if(keys.includes(name) || name === "" || teacher === "") {
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
        // console.log("my classes at gym",mySchool.classes["Gym"].teacher);
        
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
    let student = req.body
    let className = req.params.className
    let keys = Object.values(req.body)
    console.log("keys", keys)

    if(keys.includes("")) {
        res.json({
            error: "Please fill out all the information for the student",
            timestamp: "YYYY, MM/DD HH:MM:SS"
        })
    } else {
        mySchool.enrollStudent(className, student)
        console.log("students", mySchool.classes);
        console.log("look here", student)
        
        res.json({
            students: student,
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

