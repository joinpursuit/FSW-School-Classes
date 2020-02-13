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
        console.log(school)
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
    let studentIndex = ''
    console.log(school.classes[className]["students"])
    if(!school.classes[className]["students"]){
        return false
    }
    
    school.classes[className]["students"].forEach(pupil =>{
        studentList.push(Object.values(pupil).join(","))
    })
    console.log(studentList)
    console.log(Object.values(student).join(","))
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



module.exports = {addNewClass,addNewStudent,getAllClasses};