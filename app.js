const express = require("express");
const cors = require("cors");
const port = 3000;
const app = express();
const bodypaser = require("body-parser")
app.use(cors());
app.use(bodypaser.urlencoded({extended: false}));
app.use(bodypaser.json());

const School = require("./School.js");

let mySchool = new School();

app.get("/", (req, res)=>{
    res.json(mySchool);
})

app.post("/class", (req, res)=>{
    let newClass = mySchool.addClass(req.body.name, req.body.teacher);
    res.json(newClass);
});
app.post("/class/:className/enroll", (req, res)=>{
    let newStudent = mySchool.
    enrollStudent(req.params.className, {name: req.body.name, age: Number(req.body.age), city: req.body.city, grade: Number(req.body.grade)});
    res.json(newStudent)
});
app.post("/class/:className/enroll", (req, res)=>{


})


app.listen(port,() =>{
    console.log("Listening to port " + port)
})