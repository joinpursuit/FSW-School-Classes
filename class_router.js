const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

const School = require('./School')
let mySchool = new School();


router.get('/', (req, res) => {
    res.send('Get request received')
});


mySchool.addClass("Astronomy", "Mr.Bob")
mySchool.addClass("Geometry", "Mr.Jones")

let passingNy = { name:"Maddie", age: 22, city: "New York City", grade: "95" }
let failingNy = {name: "Joshua", age: 18, city: "New York City", grade: "63"}
let passingBoston = {name: "Jon", age: 21, city: "Boston", grade: "55"}
let failingBoston = {name: "Ben", age: 24, city: "Boston", grade: "85"} 

mySchool.enrollStudent("Astronomy", passingNy)
mySchool.enrollStudent("Astronomy", failingNy)
mySchool.enrollStudent("Astronomy", passingBoston)
mySchool.enrollStudent("Astronomy", failingBoston)



router.post('/', (req, res) => {
  let className = req.body.name 
  let classteacher = req.body.teacher 
  let date = new Date().toString()
 
  if (!mySchool.classes[className]) {
    let result = mySchool.addClass(className, classteacher)
    res.json({
      "class" : result,
      "message" : `Created new class ${className}`,
      "timestamp" : date
      })
  } else {
    res.status(404)
    res.json({
      "error": "Please fill out all the information or Class already exists",
     "timestamp": date
      })
  }

})


router.post('/:classname/enroll', (req, res) => {
  let className = req.params.classname 
  let studentName = req.body.name 
  let studentAge = parseInt(req.body.age)
  let studentCity = req.body.city 
  let studentGrade = parseInt(req.body.grade)
  let date = new Date().toString()


  let currClass = mySchool.classes[className].students


 if (!studentName || !studentAge || !studentCity || !studentGrade) {

    res.status(404)

    res.json({
      "error": "Please fill out all the information for the student",
     "timestamp": date
    })

  } else {

    for (let i = 0; i < currClass.length; i++) {
      if (currClass[i].name === studentName) {
          let newStudent = {
            "name": studentName,
            "age": studentAge,
            "city": studentCity,
            "grade": studentGrade
          }    
          currClass.splice(i, 1, newStudent)
              
          res.json({
          "student" : result,
          "className": className,
          "message" : `Updated Student ${studentName}`,
          "timestamp" : date
          })

      } else {

        let newStudent = {
          "name": studentName,
          "age": studentAge,
          "city": studentCity,
          "grade": studentGrade
        }
    
       let result = mySchool.enrollStudent(className, newStudent)
     
       res.json({
         "student" : result,
         "className": className,
          "message" : `Enrolled Student ${studentName}`,
          "timestamp" : date
          })
      }
    }
  } 
})


router.get('/:classname/students', (req, res) => {
  let className = req.params.classname 
  let failing = req.query.failing
  let city = req.query.city
  let date = new Date().toString()
  let result; 

  try {
    if (failing && city) {
        if (failing === 'true') {
          result = mySchool.getStudentsByClassWithFilter(className, true, city)
        } else {
          result = mySchool.getStudentsByClassWithFilter(className, false, city)
        }
     } else if (failing) {
        if (failing === 'true') {
        result = mySchool.getStudentsByClassWithFilter(className, true)
        } else {
        result = mySchool.getStudentsByClassWithFilter(className, false)
      }
     } else if (city){
       result = mySchool.getStudentsByClassWithFilter(className, 'n/a', city)
     } else {
       result = mySchool.getStudentsByClass(className)
     }

     res.status(200).json({
      "students" : result,
      "message" : "Retrieved Students",
      "timestamp" : date
      })

  } catch (err) {
    console.log(err)
    res.status(404).json({
        "error": "Class Doesn't Exist",
        "timestamp": date
      })
  }

})








module.exports = router;