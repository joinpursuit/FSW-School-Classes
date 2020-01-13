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
    if(!mySchool.addClass(req.body.name, req.body.teacher)) {
        res.json({
            error: "Please fill out all the information or Class already exists",
            "timestamp": new Date()
        })
    } else {
        res.json({
            class: req.body,
            message: "created a new class",
            timestamp: new Date()
        })
    }
})

app.post("/class/:className/enroll", (req, res) => {
    mySchool.enrollStudent(userClass, req.body)
})

app.listen(port, () => console.log("Listening on port", port));