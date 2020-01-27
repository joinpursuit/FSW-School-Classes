const School = require('./School');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


let mySchool = new School();


const port = 4000;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const validateClass = (req, res, next) => {
   let name = req.body.name;
   let teacher = req.body.teacher;
   if (!name || !teacher || mySchool.classes[name]) {
      res.status(400).json({
         status: "bad request",
         error: "Please fill out all the information or Class already exists",
         timestamp: new Date()
      })
      return
   } else {
      next()
   }
}

app.post("/class", validateClass, (req, res) => {
   mySchool.addClass(req.body.name, req.body.teacher)
   let newClass = { name: req.body.name, teacher: req.body.teacher }
   res.status(200).json({
      status: "success",
      message: "Created a new class",
      class: newClass,
      timestamp: new Date()
   })
})

const validateClassName = (req, res, next) => {
   let className = req.params.className

   if (!className) {
      res.status(400).json({
         status: "bad request",
         error: "Please type a class name",
         timestamp: new Date()
      })
      return
   } else {
      next()
   }
}

const validateStudent = (req, res, next) => {
   let name = req.body.name
   let city = req.body.city
   let age = req.body.age
   let grade = req.body.grade
   if (!name || !city || !age || !grade) {
      res.status(400).json({
         status: "bad request",
         error: "Please fill out all the information",
         timestamp: new Date()
      })
   } else {
      next()
   }
}

app.post("/class/:className/enroll", validateClassName, validateStudent, (req, res) => {
   let className = req.params.className;
   let student = { name: req.body.name, city: req.body.city, age: req.body.age, grade: req.body.grade }

   mySchool.enrollStudent(className, student);

   res.status(200).json({
      status: "success",
      student: student,
      className: className,
      message: "You enrolled a student",
      timestamp: new Date()
   })
})


app.get("/class/:className/students/", validateClassName, (req, res) => {
   let className = req.params.className;
   let students = mySchool.getStudentsByClass(className)
   res.status(200).json({
      status: "success",
      message: "Retrieve All Students in Class",
      student: students
   })
})

// const showAll = (req, res, next) => {
//    let failing = req.query.failing;
//    let className = req.params.className;
//    let students = mySchool.getStudentsByClass(className)
//    if (!failing) {
//       res.status(200).json({
//          status: "success",
//          message: "Retrieve All Students in Class",
//          student: students,
//          timestamp: new Date()
//       })
//    } else {
//       next()
//    }
// }

app.get("/class/:className/students/failing", validateClassName, (req, res) => {
   let className = req.params.className;
   let failingStudents = mySchool.getStudentsByClassWithFilter(className)
   res.status(200).json({
      status: "success",
      message: "Retrieve Failing Students in Class",
      student: failingStudents
   })
})


app.listen(port, () => {
   console.log(`Server is listening on port ${port}`)
})
