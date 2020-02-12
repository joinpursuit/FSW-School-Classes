const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const School = require("./School")
const port = 3000;

let mySchool = new School();
// let approvedMessage = {message: "Created a new class", timestamp: "Todays Date"}



app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.post("/class", (req, res) => {
    let addClass = req.body
    console.log(addClass)
    if(mySchool.classes.includes(req.body)) {
        res.json({
            error: "Please fill out all the information or Class already exists",
            timestamp: "YYYY, MM/DD HH:MM:SS"
        })
    }else {
        mySchool.classes.push(req.body)
        res.json({
            addClass,
            message: "Created a new class",
            timestamp: "YYYY, MM/DD HH:MM:SS"
        })
    }

})
app.post('/class/:name/:teacher', (req, res) => {
    let keys = Object.keys(mySchool.classes)

    if(keys.includes(req.params.name)){
            res.send({error: "Please fill out all the information or Class already exists",
            timestamp: "YYYY, MM/DD HH:MM:SS"})
        }else {
            mySchool.classes[mySchool.addClass(req.params.name, req.params.teacher)]
            mySchool.classes[req.params.name]["message"] = "Created a new class"
            mySchool.classes[req.params.name]["timestamp"] = "Todays Date"
            res.send(mySchool.classes) 
        }
})
app.post('/class/:className/enroll', (req, res) => {
    let className = req.params.className
    mySchool.classes[className]["students"].push()
})
app.get('/class/:className/students', (req,res) => {
    mySchool.classes[mySchool.addClass("math", "brandon")]
    let className = req.params.className
    res.send(mySchool.classes[className]["students"])

})


app.listen(port, () => {
    console.log("Listening to port: " + port)
})

