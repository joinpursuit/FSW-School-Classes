const School = require("./School.js")
const express = require("express")
const cors = require("cors")
const app = express()
const port = 7000
//const usersRouter = require("./School.js")
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cors())

//app.use("/school", usersRouter)
//app.use("/class", usersRouter)

let mySchool = new School()

// App.post for creating a new class
// const checkIfClassExists = (req, res, next) =>{
//     if (req.bl)
// }



app.get('/class', (req, res)=>{
    let classes = mySchool.classes
    res.json({
        classes
    })
})


app.get('/class/student', (req, res)=>{
    let students = Student.name
    res.json({
        class: mySchool.classes[name]
    })
})


const addNewClass = (req,res)=>{
    let name = req.body.name
    let teacher = req.body.teacher
    console.log(name)
    //let mySchool = new School()
    if(!mySchool.classes[name]){
        let newClass = mySchool.addClass(name, teacher)
        res.json({
            class: newClass,
            message:"Class Created"

        })
        console.log(mySchool.classes)
    } else{
        res.json({
            error: "Class already Exists"
        })
    }
}

app.post("/class", addNewClass)





// app.post for enrolling students in class

app.post("/class/add", (req,res)=>{
    let {city,age,grade,className,student} = req.body
    let newStudent = {name:student, age, city, grade}
   mySchool.enrollStudent(className, newStudent)
   
    res.status(200).json({
        className: className,
        student: student,
        age: age,
        city: city,
        grade: grade,

    })


})
//app.post("./class/add", addStudent)
//









app.listen(port,()=>{
    console.log("listening to port", port)

})