let school = require("../db/db")


const getAllClasses = (req,res)=>{
    res.json({
        status: "sucess",
        classes: school.classes,
        timestamp: Date(Date.now()).toString()
    })
}
const addNewClass = (req,res) =>{
    let newClassName = req.body["name"]
    let newClassTeacher = req.body["teacher"]
    
    if(school.classes[newClassName.toLowerCase()]){
        res.json({
            status:"failure", 
            message: "Class already exist"
        })
    } else {
        school.addClass(newClassName.toLowerCase(),newClassTeacher)
        res.json({
            class:school.classes[newClassName],
            status:"sucess",
            message: "Created a new class",
            timestamp: Date(Date.now()).toString()
        })
    }
}

const studentCheck = (className, student)=>{

    let studentList = []
    if(!school.classes[className]["students"]){
        return false
    }
    
    school.classes[className]["students"].forEach(pupil =>{
        studentList.push(Object.values(pupil).join(","))
    })
    if(studentList.includes(Object.values(student).join(","))){
        return true
    } else {
        return false
    }
    
}

const addNewStudent = (req, res) =>{
    let enrollClass = req.params["className"] 
    let newStudent = req.body
    if(!studentCheck(enrollClass,newStudent)){
        
        school.enrollStudent(enrollClass,newStudent)
        
        res.json({
            student:newStudent,
            className:enrollClass,
            message: "Enrolled Student",
            status: "success",
            timestamp: Date(Date.now()).toString()
        })

    } 
    else {
        res.json({
            status:"failure", 
            message: "student already enrolled"
        })
    }
    
}


const studentsByClass = (req,res)=>{
    let queryClass = req.params["className"]
    let queryfailing = req.query["failing"]
    let queryCity = req.query["city"]
    let queryStudentList

    if(queryfailing === "false" && queryCity === "all"){
        queryStudentList = school.getStudentsByClass(queryClass)
        
    } else {
        
        queryStudentList = school.getStudentsByClassWithFilter(queryClass,queryfailing,queryCity)
    }

    if(queryStudentList.length === 0){

        res.json({
            students: queryStudentList,
            status: "failure",
            message: " No Students found",
            timestamp: Date(Date.now()).toString()
        })
    } else {

        res.json({
            status: "success",
            students: queryStudentList,
            message: "Retrieved Students",
            timestamp: Date(Date.now()).toString()
        })
    }
}

module.exports = {addNewClass,addNewStudent,getAllClasses, studentsByClass};