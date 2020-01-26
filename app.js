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

const addNewClass = (req,res,next) =>{
    let newClassName = req.body["name"]
    let newClassTeacher = req.body["teacher"]
    
    if(mySchool.classes[newClassName]){
        res.json({status:"failure", message: "Class already exist"})
    } else {
        mySchool.addClass(newClassName,newClassTeacher)
        console.log(mySchool)
        res.json({status:"sucess", classes:mySchool["classes"]})
    }
}

app.post("/school/classes", addNewClass)

let enrollStudent = (req, res, next) =>{
    let newStudent = req.body
    if(mySchool.classes[newStudent["name"]]){
        mySchool.classes[newStudent["name"]]["students"].push(newStudent["student"])
      }
      next()
}

let newDate = new Date()
let timeStamp =`${newDate.getFullYear()},${newDate.getMonth()+1}/${newDate.getDate()} ${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}`


app.post("/school/students", enrollStudent, (req,res) =>{
    console.log(req.body)
    res.json({status:"sucess", mySchool, timestamp:timeStamp})
})

app.get("/school/:className/students/", (req,res)=>{
    let queryClass = req.params["className"]
    let queryStudents = req.query["failing"]
    let queryCity = req.query["city"]
    bodee=req.body
    console.log(bodee)
    res.json(req.query)
})

app.get("/school",(req,res) =>{
    res.json({mySchool})
})
