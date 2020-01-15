const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser")
const School = require( "./School.js")

const port = 3000;

const app = express();

let mySchool = new School()

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())
app.listen(port, () => {
    console.log("Listening to port ", port)
})

app.post("/school/classes", (req,res) =>{
    console.log(req.body)
    let newClass = req.body
    mySchool.addClass(newClass["name"],newClass["teacher"])
    res.json({status:"sucess", mySchool})
})

app.post("/school/students", (req,res) =>{
    console.log(req.body)
    let newStudent = req.body
    mySchool.enrollStudent(newStudent["className"],newStudent["student"])
    res.json({status:"sucess", mySchool})
})
