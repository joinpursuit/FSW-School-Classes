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
        res.json({
            class:mySchool.classes[newClassName],
            status:"sucess",
            message: "Created a new class",
            timestamp: Date(Date.now()).toString()
        })
    }
}

app.post("/school/classes", addNewClass)

const studentCheck = (className, student)=>{
    let studentList = []
    let studentIndex = ''
    let studentInClass = false

    mySchool.classes[className]["students"].forEach(pupil =>{
        studentList.push(pupil["name"])
    })
    if(studentList.includes(student["name"])){
        studentInClass = true
    }

    return studentInClass
    
}
const studentEnroll = (req, res, next) =>{
    let enrollClass = req.params["className"] 
    let newStudent = req.body
    console.log(enrollClass)
    console.log(newStudent)
    
    console.log(mySchool.classes[enrollClass])
    if(!studentCheck(enrollClass,newStudent)){
        
        mySchool.enrollStudent(enrollClass,newStudent )
        next()
    } else {
        mySchool["classes"][enrollClass]["students"].forEach(pupil=>{
            if(pupil.name === newStudent.name){
                mySchool.classes[enrollClass]["students"].splice(mySchool.classes[enrollClass]["students"].indexOf(pupil),1,newStudent)
            }

        })
        next()
    }
    
}


app.post("/school/:className/enroll", studentEnroll, (req,res)=>{
    let enrollClass = req.params["className"] 
    res.json({
        student: mySchool.classes[enrollClass]["students"],
        className: enrollClass,
        message: "Enrolled Student",
        timestamp: Date(Date.now()).toString()
    })
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
