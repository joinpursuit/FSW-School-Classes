const express = require('express');
const time = require('express-timestamp')
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 3000;
const app = express();
app.use(cors());
app.use(time.init)
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const School = require("./School.js");


let mySchool = new School();


app.get("/school", (req, res) => {
    res.json(mySchool);
})

app.post("/class", (req,res) => {
    if(!mySchool.classes.hasOwnProperty(req.body.name) && req.body.name !== "" && req.body.teacher !== ""){
        mySchool.addClass(req.body.name, req.body.teacher)
        res.json({
            "class": { "name": req.body.name, "teacher": req.body.teacher, "students": []},
            "message": "Created a new class",
            "timestamp": req.timestamp
        })
        console.log(mySchool)
    } else {
        res.json({
            "error": "Please fill out all the information or Class already exists",
            "timestamp": req.timestamp
        })
    }
})

app.post("/class/:className/enroll", (req, res) => {
    mySchool.enrollStudent(req.params.className, req.body.name)
    console.log(mySchool);
    res.json(mySchool)
})

app.listen(port, () => console.log("Listening on port: ", port));