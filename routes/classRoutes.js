let express = require("express");
let cors = require("cors");
let Student = require("../Student.js")
let School = require("../School.js")

let router = express.Router();
router.use(cors());


let mySchool = new School();

router.post("/", (req, res) => {  
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

router.post("/:className/enroll", (req, res) => {
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

router.patch("/:className/update", (req, res) => {
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

router.get("/:className/students", (req, res) => {
    let className = req.params.className;
    // let failing = req.body.failing;
    mySchool.getStudentsByClass(className)
    res.json(mySchool.getStudentsByClass(className));  
}) 

router.get("/:className/students/:failing", (req, res) => {
    let className = req.params.className;
    let failing = req.params.failing;
    res.json(mySchool.getStudentsByClassWithFilter(className, failing));
})


module.exports = router;