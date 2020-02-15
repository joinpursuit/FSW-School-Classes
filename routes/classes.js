// const express = require("express")
// const cors = require("cors")
// const School = require("../School")
// const Student = require("../Student")
// let classes = express.Router()
// classes.use(cors())

// let mySchool = new School();
// const inputCheck = (request,response,next)=>{
//     let className = req.body.className;
//     let teacher = req.body.teacherName;

//     if(className.length === 0 || teacher.length === 0 || className === className || teacher ===teacher){
//         response.json({})

// } else{
//     response.json({})
}
// classes.get("/", (request, response) => {
//    try{
//        response.json({
//            classes,
//            message:"success",

//        })

//    }catch(error){
//        response.json({
//            error:"data cant be retrieved",
//        })

//    }
// })

// const checkIfClassExists = (req, res, next) => {

// }


// const addNewClass = (request, response) => {
//     try{
//         let addedClass = mySchool.addClass(request.body.class, request.body.teacher)
//         response.json({
//             status: "ok",
//             message: addedClass.name + " taught by " + addedClass.teacher + " was added"
            
//         })
//     }catch(error){
//         response.json({
//             status: "500",
//             message: "error or already exists",
//             error: error
//         })
        
//     }
// }
// classes.post("/", checkIfClassExists, addNewClass)


// classes.post("/enroll/:className", (request, response) => {
//     try{
//         let newInfo = request.body
//         newSchool.enrollStudent(newInfo.class,{name:newInfo.name, age:newInfo.age,city:newInfo.city, grade:newInfo.grade})
//         res.json(
//             {
//                 status: "ok",
//                 message: request.body.name + " are an enrolled Student"
//     })
//     }catch(error){
//         response.json({
//             error: "data could not be added or already exists"
//         })
//     }
// })


// classes.get("/lists/:className", (request, response) => {
//     let className = request.body;
//     mySchool.getStudentsByClass(className)
//     response.json({
//         "classes": { "classes": classes },
//         "Time": new Date(),
//         message: `${classes}, list of students`
//     })

// })
// classes.get("lists/:className/:failing", (request, response)=>{
//     let className = request.params.className;
//     let failing = request.params.failing;
//     response.json(mySchool.getStudentsByClassWithFilter(className, failing))
// })


module.exports = classes;