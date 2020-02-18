const express = require("express");
const cors = require("cors")
const bodyParser = require("body-parser");
const app = express();
const port = 4000;
const School = require("./School");
const Class = require('./Class');
const Student = require('./Student')



app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())

let mySchool = new School();
const allClasses = (request,response)=>{
response.status(200).json({
    status: "success",
    message: "All classes",
    body: mySchool.classes
})
}
const checkClassName = (request,response,next)=>{
    let classes = request.body.classes
    let teacher = request.body.teacher
if(!classes||!teacher){
    response.json({
        error:"not valid data",
        time: new Date()
    })
}else{
    next()
}
}
const addClass =(request,response)=>{
    let classes = request.body.classes
    let teacher = request.body.teacher
    let newClass = mySchool.addClass(classes, teacher)
    request.status(200).json({
        status:"success",
        message: "added a new class",
        body: newClass,
        time: new Date()
    })

}
const ifRepeated =(request,response,next)=>{
let className = request.body.name
if(!mySchool.classes[className]){
    response.json({
        error:"class exists",
        time: new Date()
    })
}
next()

}
const enrollStudent=(request,response)=>{
    let name = request.body.name;
    let age = request.body.age;
    let city = request.body.city;
    let grade = request.body.grade;
    let className = request.params.name;
    let newStudent = new Student(name, age, city, grade, className)
    let enrolledStudent = mySchool.enrollStudent(request.params['className'], newStudent);
    if(!enrolledStudent){
        response.json({
            error: "student does not exist",
            time: new Date()
        })
    }else {
        response.json({
            student : enrolledStudent,
            class: className,
            message: 'Enrolled ',
            time: new Date()
        })
    }
}
const classExist=(request,response,next)=>{
    let className = (request.params.name)
    if(!mySchool.classes[className]){
        response.json({

        })
    }else{
        next()
    }
}
const studentExist=(request,response,next)=>{
    if(!request.body.name||!request.body.age|| !request.body.city|| !request.body.grade){
        response.json({
            error: "student exists",
            time: new Date()
        })
    }else{
        next()
    }

}
const studentBody=(request,response)=>{
    let className = request.body.name;
    let failing = request.query.failing;
    let city = request.query.city;
    if (failing === 'true') {
        failing = true;
    } else {
        failing = false;
    }
    let filtered = [];
    if (!failing && !city) {
        filtered = mySchool.getStudentsByClass(className);
    } else {
        response.json({
            students: filtered,
            message: "Retrieved Students",
            timestamp: new Date()
        }) 

    }
}

app.get("/", allClasses)
app.post("/class",checkClassName,addClass,ifRepeated)
app.post("/class/:className",classExist,enrollStudent,studentExist)
app.get("/class/:className/students/failing",classExist,studentBody)

app.listen(port,()=>{
    console.log("server is running", port)
})