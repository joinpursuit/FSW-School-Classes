const express = require("express");
const cors = require("cors");
const app = express(); 
const port = 3000;
const bodyParser = require("body-parser");
// const School = require("./School.js");
const classRouter = require("./routes/classRoute.js")

app.use("/route", classRouter)
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());






// app.post("./class/:className/enroll", (req, res) => {
//     let className = req.params.className
//     // let name = req.body.name
//     // let age = req.body.age
//     // let city = req.body.city
//     // let grade = req.body.grade
//     // // let studentObj = {
//     // //     name,  
//     // //     age,
//     // //     city,
//     // //     grade
//     // }) 

//     if(!school.classes[className].student){
//         let newStudent = enrollstudent(className, student)
//         res.json({
//             "student": student,
//             "className": className,

//             "message": "New Enrolled Student",
//         })
//     } else {
    

// }











app.listen(port, () => "listening");
