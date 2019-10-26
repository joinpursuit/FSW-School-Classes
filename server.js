const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const bodyParser = require("body-parser");
const School = require("./School.js");
const Class = require('./Class');
const Student = require('./Student')


let mySchool = new School();
// let peter = new Student("Peter", 25, "NY", 65)
// mySchool.addClass("math", "Alejo");

// console.log(mySchool.enrollStudent("math", peter));
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(bodyParser())

// console.log(mySchool.classes["math"])

app.post("/class", (req, res) => {  
    let className = req.body.className;
    // console.log("body", req.body)
    let teacherName = req.body.teacherName;
    console.log(className, teacherName)
    if(className.length === 0 || teacherName.length === 0) {
            res.json({message: "Please enter all the information", "timestamp": new Date()});
        } else {
            if (!mySchool.classes[className]){
                mySchool.addClass(className, teacherName);

                res.json({
                "class": mySchool.classes[className],
                "message": `Created a ${className} class taught by ${teacherName}`,
                "timestamp": new Date()
                })
            } else {
                res.json({message: "Class already exists", timestamp: new Date()});
            } 
        }
})

app.post("/class/:className/enroll", (req, res) => {
    let className = req.params.className;

    let studentName = req.body.studentName;
    let studentAge = req.body.studentAge;
    let studentCity = req.body.studentCity;
    let studentGrade = req.body.studentGrade;

    let newStudent = new Student(studentName, studentAge, studentCity, studentGrade);

    if(studentName.length === 0 || studentAge.length === 0 || studentCity.length === 0 || studentGrade.length === 0) {
        res.json({message: "Please fill out all the information for this student.", timestamp: new Date()});
    } else {
        mySchool.enrollStudent(className, newStudent);
        res.json({
            student: newStudent,
            className: className,
            message: `Enrolled ${studentName} in ${className}`,
            timestamp: new Date()
        })
    }
})

app.patch("/class/:className/update", (req, res) => {
    let className = req.params.className;

    let studentName = req.body.studentName;
    let studentGrade = req.body.studentGrade;

    for(let i in mySchool.classes[className].students) {
        // console.log(mySchool.classes[className].students[i])
        if (i === studentName) {
            mySchool.changeGrade(className, mySchool.classes[className].students[i], studentGrade)
            res.json({
                student: i,
                className: className,
                message: `${studentName}'s grade in ${className} has been change to ${studentGrade}.`,
                timestamp: new Date()
            }) 
        }
    }

})

app.get("/class/:className/students", (req, res) => {
    let className = req.params.className;
    // let failing = req.body.failing;
    mySchool.getStudentsByClass(className)
    res.json(mySchool.getStudentsByClass(className));  
}) 

app.get("/class/:className/students/:failing", (req, res) => {
    let className = req.params.className;
    let failing = req.params.failing;
    res.json(mySchool.getStudentsByClassWithFilter(className, failing));
})

app.listen(port, () => {
    console.log(`server is running at port ${port}`);
})

