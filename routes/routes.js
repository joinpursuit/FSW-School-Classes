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
    let name = req.body.name;
    let teacher = req.body.teacher;
    // console.log(mySchool)
    res.json({
        class: mySchool.addClass(name, teacher),
        message: "Created a new class",
        timestamp: timeStamp()
    })
}

const checkClass = (req, res, next) => {
    console.log('body',req.body.name)
    if (mySchool.classes[req.body.name]) {
        res.json({
            error: "Please fill out all the information or Class already exists",
            timestamp: timeStamp()
        })
    } else {
        next();
    }
}

const addStudent = (req, res) => {
    // let name = req.body.name;
    // let age = req.body.age;
    // let city = req.body.city;
    // let grade = req.body.grade;
    let class_name = req.params.class_name;
    // console.log('classname',class_name);
    // console.log(mySchool)
    let qqq = mySchool.enrollStudent(class_name, req.body)
    console.log('qqq',qqq)
    res.json({
        student: qqq,
        className: class_name,
        message: "Enrolled Student",
        timestamp: timeStamp()
    })
}

const checkStudent = (req, res, next) => {
    let className = req.params.class_name;
    let classArr = mySchool['classes'][className]['students'];
    // console.log(mySchool["classes"][className]["students"])
    if(classArr.length){
        classArr.forEach(el => {
            if (el.name === req.body.studentName) {
                res.json({
                    error: "Student already exists!",
                    timestamp: timeStamp()
                })
            } else{
                next()
            }
        }) 
    } else {
        next()
    }
}

const studentsByClass = (req, res, next) => {
    let className = req.params.class_name;
    try {
        if (mySchool.classes[className])  {
            res.json({
                students: mySchool.getStudentsByClass(className),
                message: "Retrieved Students",
                timestamp: timeStamp(),
                allClasses:{Science:[]}
            })
        } 
    } catch (err) {
        next(err)
    }

}

const validateClass = (req, res, next) => {
    let className = req.params.class_name;
    // console.log(req.params.class_name)
    // console.log(req.query.city)
    // console.log(req.query.failing)
    if (!mySchool.classes[className]) {
        res.json({
            error: `Class ${className} does not exist!`,
            timestamp: timeStamp(),
            allClasses: ['you', 'reached validate error']
        })
    } else {
        next();
    }
}

const classWithFilter = (req, res, next) => {
    let chosenClass = req.params.class_name;
    let failing = req.query.failing;
    let city = req.query.city;
    // console.log('qweqwe', chosenClass, failing, city)
    try {
        if (failing === "true" && city) {
            let students = mySchool.getStudentsByClassWithFilter(chosenClass, failing, city)
            
            res.json({
                students: students ,
                message: `failing true in city: Retrieved Failing Students in ${city}`,
                timestamp: timeStamp(),
                allClasses: ['you', 'reached filter error']
            })
        } else if (failing === 'false' && city) {
            console.log("hey im here")
            res.status(200).json({
                students: mySchool.getStudentsByClassWithFilter(chosenClass,failing,city),
                message: "failing false in city: Retreived ALL Passing Students",
                timestamp: timeStamp(),
                allClasses: ['you', 'reached filter error']
            })
    
        } else if (failing === 'false') {

            res.status(200).json({
                students: mySchool.getStudentsByClassWithFilter(chosenClass, failing, city),
                message: "failing false: Retrieved ALL Passing Students",
                timestamp: timeStamp(),
                allClasses: ['you', 'reached validate error']
            })
    
        }else if (failing === 'true') {
            res.status(200).json({
                students: mySchool.getStudentsByClass(chosenClass),
                message: "failing true: Retrieved ALL Passing Students",
                timestamp: timeStamp(),
                allClasses: ['you', 'reached validate error']
            })
    
        } else if (city) {
            res.status(200).json({
                students: mySchool.getStudentsByClassWithFilter(chosenClass,failing, city),
                message: `students in city: Retrieved ALL students in ${city}`,
                timestamp: timeStamp(),
                allClasses: ['you', 'reached validate error']
            })
        } else {
            next();
        }
    } catch (err) {
        next(err)
        console.log(err);
    }
        // query all students failing in city, getStudentFailingInCity()
    //     mySchool.classes[chosenClass]['students'].filter(student => {
    //         if (failing && student.grade < 70 && student.city.toLowerCase() === city.toLowerCase()) {
    //             result.push(student);
    //             res.json({
    //                 students: result,
    //                 message: `Retrieved Failing Students in ${city}`,
    //                 timestamp: timeStamp()
    //             })
    //         }
    //     })
    //     // next();
    // } else if (failing) {
    //     // query all students failing, getStudentFailing()
    //     mySchool.classes[chosenClass]['students'].filter(student => {
    //         if (failing && student.grade < 70) {
    //             result.push(student);
    //             res.json({
    //                 students: result,
    //                 message: "Retrieved ALL Failing Students",
    //                 timestamp: timeStamp()
    //             })
    //         }
    //     })
    //     // next();
    // } else {
    //     // query all students in city, getStudentCity()

    //     res.json({
    //         failing: false,
    //         grade: grade
    //     })
    //     // next();
    // }
}



router.get("/", showAllClasses);

router.post("/", checkClass, addClass);
router.post("/:class_name/enroll", checkStudent, addStudent);
router.get("/:class_name/students", validateClass, classWithFilter, studentsByClass);

module.exports = router;