const express = require('express')
const app = express()
const bodyParser = require ('body-parser')
const port = 8080;

app.use(bodyParser.urlencoded({
    extended: false
}))


const School = require('./School.js')

let mySchool = new School();
// console.log(mySchool)

app.get('/all', (req,res) => {
    let allRequest = mySchool.classes;
    res.send( allRequest )
})


const newClass = (req, res, next) => {
    let newClass = req.body.name
    let newTeacher = req.body.teacher
    let timeStamp = new Date();
    mySchool.addClass(newClass, newTeacher)

        // console.log(mySchool.classes[newClass])

    res.json({
        "class": mySchool.classes[newClass],
        "message" : "Created a new class", 
        "time": timeStamp.toLocaleString()
    })
}

app.post("/class", newClass)

const checkNewStudent = (req, res, next) => {
    let name = req.body.name
    let age = req.body.age
    let city = req.body.city
    let grade = req.body.grade
    // let className = req.params.className
    let timeStamp = new Date();
    if(!name || !age || !city || !grade){
        res.json({
            error: "Missing information",
            "message": timeStamp.toLocaleString()
        })
        
    }else{
    next()
    }
}

 const newStudent = (req, res, next) => {
    //  console.log("hitting new student function")
    let name = req.body.name
    let age = req.body.age
    let city = req.body.city
    let grade = req.body.grade
    let className = req.params.className
    let timeStamp = new Date();
     mySchool.enrollStudent(className, name, age, city, grade)

    res.json(
        {"student": name,
        "className": className,
        "age": age,
        "city": city,
        "grade": grade,
         "message": "student added",
         "time": timeStamp.toLocaleString()
        })

    }
 


const updateStudent = (req,res,next) => {
        // console.log("classStudents", classStudents)
        let name = req.body.name
        let age = req.body.age
        let city = req.body.city
        let grade = req.body.grade
        let className = req.params.className
        let timeStamp = new Date();
     
    let classStudents = mySchool.classes[className].students 
    
        let studentCheck = null;

    for(let i = 0; i < classStudents.length; i++){   
        if(classStudents[i].name === name){
            studentCheck = classStudents[i] 
    }
      }
      if(studentCheck !== null){
        studentCheck.name = name
        studentCheck.age= age
        studentCheck.city = city
        studentCheck.grade = grade
        studentCheck.timeStamp = timeStamp.toLocaleString()

        res.json({
            name: studentCheck.name,
            age: studentCheck.age,
            city: studentCheck.city,
            grade: studentCheck.grade,
            timeStamp: studentCheck.timeStamp

        })
      } else{
        next()
      }
}

app.post("/class/:className/enroll", checkNewStudent, updateStudent, newStudent)





const getStudentsByClass = (req,res) => {
    let className = req.params.className
    let failing = req.query.fail
  let studentsInClass = mySchool.getStudentsByClass(className);

  if(failing){
    let failingStudents = mySchool.getStudentsByClassWithFilter(className, failing)
      res.json({
        className: className,
        failingStudents: failingStudents,
        failing: failing
    })
  }
  else{
  res.json({
      className: className,
      studentsInClass: studentsInClass,
      failing: failing
  })
}
}

app.get("/class/:className/students", getStudentsByClass)



app.listen(port, () => {
    console.log("running")
})