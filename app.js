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
const Student = require("./Student.js");


let mySchool = new School();


app.get("/", (req, res) => {
    res.json(mySchool);
}) //end get

app.post("/class", (req,res) => {
    if(!mySchool.classes.hasOwnProperty(req.body.name) && req.body.name !== "" && req.body.teacher !== ""){
        mySchool.addClass(req.body.name, req.body.teacher)
        res.json({
            "class": { "name": req.body.name, "teacher": req.body.teacher, "students": []},
            "message": "Created a new class",
            "timestamp": req.timestamp
        })
    } else {
        res.json({
            "error": "Please fill out all the information or Class already exists",
            "timestamp": req.timestamp
        })
    }
}) //end post

app.post("/class/:className/enroll", (req, res) => {
    if(!mySchool.classes[req.params.className]){
        res.json({ 
            "error": "Class doesn't exist!",
            "timestamp": req.timestamp
        })
    }
    let students = mySchool.classes[req.params.className]["students"];
    if(!req.params.className || !req.body.name || !req.body.age || !req.body.city || !req.body.grade){
        res.json({ 
            "error": "Please fill out all the information for the student",
            "timestamp": req.timestamp
        })
    } else if(!students.some(obj => obj.name === req.body.name)){
        mySchool.enrollStudent(req.params.className, new Student(req.body.name, req.body.age, req.body.city, req.body.grade))
        res.json({
            "student": {"name": req.body.name, "age": req.body.age, "city": req.body.city, "grade": req.body.grade},
            "className": req.params.className,
            "message": "Enrolled Student",
            "timestamp": req.timestamp
        })
    } else {
        for(let i = 0; i < students.length; i++){
            if(students[i].name === req.body.name){
                students[i].age = req.body.age;
                students[i].city = req.body.city;
                students[i].grade = req.body.grade;
                res.json({
                    "student": {"name": req.body.name, "age": req.body.age, "city": req.body.city, "grade": req.body.grade},
                    "className": req.params.className,
                    "message": "Updated Student",
                    "timestamp": req.timestamp
                })
            }
        }
    }
}) //end post



app.listen(port, () => console.log("Listening on port: ", port));