const School = require("../School");
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const cors = require("cors");

router.use(cors());
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

const timeStamp = () => new Date().toLocaleString();

let mySchool = new School();

const showAllClasses = (req, res) => {
    res.json({
        allClasses: mySchool.classes
    })
}

const addClass = (req, res, next) => {
    let className = req.body.className;
    let teacher = req.body.teacher;
    console.log(mySchool)
    res.json({
        class: mySchool.addClass(className,teacher),
        message: "Created a new class",
        timestamp: timeStamp()
    })
}

const checkClass = (req, res, next) => {
    console.log("class name" ,mySchool['classes'])
    if (mySchool.classes[req.body.className]) {
        res.json({
            error: "Please fill out all the information or Class already exists",
            timestamp: timeStamp()
        })
    } else {
        next();
    }
}

const addStudent = (req, res, next) => {
    // let name = req.body.name;
    // let age = req.body.age;
    // let city = req.body.city;
    // let grade = req.body.grade;
    let class_name = req.params.class_name;
    console.log('classname',class_name);
    res.json({
        student: mySchool.enrollStudent(class_name, req.body),
        className: class_name,
        message: "Enrolled Student",
        timestamp: timeStamp()
    })
}

const checkStudent = (req, res, next) => {
    let className = req.params.class_name;
    let classArr = mySchool['classes'][className]['students'];
    console.log(mySchool["classes"][className]["students"])
    if(classArr.length !== 0){
        classArr.forEach(el => {
        if (el.name === req.body.name) {
            res.json({
                error: "Please fill out all the information for the student",
                timestamp: timeStamp()
            })
        } 
    })
    } else{
        next()
    }
}
const isFailing = (req, res, next) => {
    let grade = req.params.class_name.students.grade
    if (mySchool.classes[grade] < 70) {
        res.json({
            failing: true,
            grade: grade
        })
        next();
    } else {
        res.json({
            failing: false,
            grade: grade
        })
        next;
    }
}

const getStudentsByClass = (req, res, next) => {
    let className = req.params.class_name;
    if (mySchool.classes[className])  {
    res.json({
        students: mySchool.classes[className]['students'],
        message: "Retrieved Students",
        timestamp: timeStamp()
    })
} else {
    res.json({
        error: `Class ${className} does not exist!`,
        timestamp: timeStamp()
        })
    }

}

router.get("/", showAllClasses);

router.post("/", checkClass, addClass);
router.post("/:class_name/enroll", checkStudent, addStudent);
router.get("/:class_name/students", isFailing, getStudentsByClass);

module.exports = router;