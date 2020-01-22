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
    console.log(mySchool)
    res.json({status:"sucess", mySchool})
})

let enrollStudent = (req, res, next) =>{
    let newStudent = req.body
    if(mySchool.classes[newStudent["name"]]){
        mySchool.classes[newStudent["name"]]["students"].push(newStudent["student"])
      }
      next()
}

app.post("/school/students", enrollStudent, (req,res) =>{
    console.log(req.body)
    res.json({status:"sucess", mySchool})
})
