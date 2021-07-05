const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser")
const time = require("express-timestamp")
const School = require("./School")

const port = 3000;
const app = express();

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json());
app.use(time.init)

let mySchool = new School();

app.get("/", (req,res,next) => {
    res.json("GET request on app.js")
})

app.post("/", (req,res,next) => {
    res.json("POST request on app.js")
})


app.post('/class/', (req, res, next) => {
    try {
        let addClass = mySchool.addClass(req.body.name, req.body.teacher);
        res.json({
            status: "success",
            message: "Created a new class",
            name: req.body.name,
            teacher: req.body.teacher,
            addClass
        })
    } catch(err) {
        next(err)
    }
})

app.post('/class/:className/enroll', (req,res,next) => {
    try{
        let newStudent = mySchool.enrollStudent(req.params.className, req.body.name,req.body.age,req.body.city,req.body.grade);
        res.json({
            status: "success",
            message: "Enrolled Student",
            className: req.params.className,
            student: {name: req.body.name, age: req.body.age, city: req.body.city, grade: req.body.grade},
            newStudent
        })
    } catch(err) {
        next(err)
    }
})


app.get("/:className/students", (req,res,next) => {
    try{
        let allStudents = mySchool.getStudentsByClass(req.params.className)
        res.json({
            status: "success",
            message: "Retrieved Students",
            students: [],
            allStudents
        })
    } catch(err) {
        next(err)
    }
})


app.listen(port, () => {
    console.log("App is listening on port ", port)
})