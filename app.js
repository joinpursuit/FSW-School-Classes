const express = require("express");
const cors = require("cors");
const port = 3000;
const app = express();
const bodypaser = require("body-parser")
app.use(cors());
app.use(bodypaser.urlencoded({extended: false}));
app.use(bodypaser.json());

const School = require("./School.js");
const Student = require("./Student.js");

let mySchool = new School();




app.post("/class", (req, res)=>{
    

    let name = req.body.name;
    let teacher = req.body.teacher;
    let newSubject = mySchool.addClass(name, teacher);
    //route if class or teacher input does not exists
    if(!name || !teacher){
        res.status(400).json({
            error: "Please fill out all the information required",
            timestamp: new Date().toString()
        })
        //route if the class already exist
    }else if(mySchool.classes[req.body.name].name === name && mySchool.classes[req.body.name].teacher === teacher){
        res.status(400).json({
            error: "This class already exists",
            timestamp: new Date().toString()
        })
    }else{
        //route if a class is created
        // console.log(newSubject)
        res.status(200).json({
            class: newSubject,
            message: "You have created a new class",
            timestamp: new Date().toString()
        })
    }
    
})


//method that is a middleware that will show all the students that are enrolled
// const checkForStudents = (req, res, next) =>{
    // let verifyStu = mySchool.classes[req.params.name].students;
    // console.log(req.body, req.params)

    // verifyStu.forEach(student =>{
    //     if(student.name === req.body.name){
    //         res.status(400).json({
    //             error:"This student already exists",
    //             timestamp: new Date().toString()
    //         })
    //     }else{
            // next();
    //     }
    // })
// }

//enrolling students
app.post("/class/:className/enroll", (req, res)=>{
    let newStudent = new Student (
        req.body.name,
        req.body.age,
        req.body.city,
        req.body.grade
        );

    let studentInfo = mySchool.enrollStudent(req.params.className, newStudent);
    let verifyStu = mySchool.classes[req.params.className].students;
    // console.log(verifyStu)


    if(!req.body.name || !req.body.age || !req.body.city || !req.body.grade){
        res.status(400).json({
            error:"You have not entered the information needed",
            timestamp: new Date().toString()
        })
    }
    else if(req.body.name){
        verifyStu.forEach(student=>{
            if(req.body.name === student.name){
                student.age = req.body.age;
                student.city = req.body.city;
                student.grade = req.body.grade;
                res.status(200).json({
                    status: 'success',
                    message: `${req.body.name}'s information has been updated`,
                    timestamp: new Date().toString()
                })
            }
        })

    }
    else{
        res.status(200).json({
            student: studentInfo,
            message: "these are the enrolled students",
            timestamp: new Date().toString()
        })

    }
});



const test = ( req, res, next )=>{
    // console.log("middle Hit")
    if(req.query.failing < 70 || req.query.city){
        let fallingCities = mySchool.getStudentsByClassWithFilter(req.params.className, req.query.failing, req.query.city);
        res.status(200).json({
            students: fallingCities,
            message: "this is the list of failing students and cities",
            timestamp: new Date().toString()
        });
    }
    next();
}
app.get("/class/:className/students", test, (req, res)=>{

    let allStudents = mySchool.getStudentsByClass(req.params.className);

    if(!req.params.classes){
        res.status(400).json({
            status: "error",

        })
    }


        // res.status(200).json({
        //         students: allStudents,
        //         message: "Retrived Students",
        //         timestamp: new Date().toString()
        // })

        // res.status(400).json({
        //     message: "this class does not exist",
        //     timestamp: new Date().toString(),
        //     test: req.test
        // })
})




app.listen(port,() =>{
    console.log("Listening to port " + port)
})