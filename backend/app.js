const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const timestamp = require("express-timestamp")
const port = 3000
const app = express()
const School = require("./School")

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(timestamp.init)

app.listen(port, () => {
    console.log("Grading on port ", port)
  })

  // * @return {Student[]} Array of Student objects

  let theSchool = new School()
  theSchool.addClass("Math", "Professor Pie")
  theSchool.addClass("Science", "Professor Atom")
  theSchool.addClass("Spanish", "Professor Maestra")
  theSchool.addClass("History", "Professor Franklin")
  theSchool.enrollStudent("History",{name:"Manny",age:16,city:"Bronx",grade:55})
  theSchool.enrollStudent("History",{name:"Emma",age:14,city:"Queens",grade:70})
  theSchool.enrollStudent("Spanish",{name:"Max",age:16,city:"Brooklyn",grade:90})
  theSchool.enrollStudent("Spanish",{name:"Charlie",age:15,city:"Manhattan",grade:55})
  theSchool.enrollStudent("Science",{name:"Dave",age:14,city:"bronx",grade:55})
  theSchool.enrollStudent("Science",{name:"Sarah",age:18,city:"Bronx",grade:65})
  theSchool.enrollStudent("Math",{name:"Lyn",age:17,city:"Manhattan",grade:55})
  theSchool.enrollStudent("Math",{name:"Carla",age:15,city:"Bronx",grade:80})
  // theSchool.getStudentsByClass([className]["students"])
// console.log(theSchool.classes)
// console.log(theSchool)
// console.log(theSchool.classes["Math"]["students"])
// console.log(theSchool.getStudentsByClass("Math"))
// console.log(theSchool.getStudentsByClassWithFilter("Math", false))
// console.log(theSchool.getStudentsByClassWithFilter("Math", true))


// theSchool.classes[className]["students"]


// app.get("/school",(req,res)=>{
//   let moment = req.timestamp
//   try {
//     let info = theSchool
//     res.json({
//     payload: info,
//     status: "success",
//     message: "Retrieved Students",
//     moment
//   })
//   } catch (error) {
//     console.log(error)
//   }
// }) 

app.get("/class",(req,res)=>{
  let moment = req.timestamp
  try {
    let info = theSchool.classes
    res.json({
    payload: info,
    status: "success",
    message: "Retrieved classes",
    moment
  })
  } catch (error) {
    res.json({
      status: "error",
      message: "classes not Retrieved ",
      moment
    })
  }
}) 

// app.get("/:className/students",(req,res)=>{
//   let moment = req.timestamp
//   let {className} = req.params
//   try {
//     console.log(req.query.failing);
    
//     let info = theSchool.getStudentsByClass(className)
//     res.json({
//     payload: info,
//     status: "success",
//     message: "Retrieved Students",
//     moment
//   })
//   } catch (error) {
//     console.log(error)
//   }
// })

app.get("/:className/students",(req,res)=>{
  let moment = req.timestamp
  let {className} = req.params
  let value = req.query.failing
  var boolValue = (value == 'true');
  let failing = boolValue
  try {
    let info = theSchool.getStudentsByClassWithFilter(className, failing) 
    res.json({
    payload: info,
    status: "success",
    message: "Retrieved Students",
    moment
  })
  } catch (error) {
    res.json({
      status: "error",
      message: "Students not Retrieved ",
      moment
    })
  }
})


app.post("/class", (req, res) => {
  let moment = req.timestamp
  let {name, teacher} = req.body
  try {
        let info = theSchool.addClass(name, teacher)
        res.json({
        payload: info,
        status: "success",
        message: "class added",
        moment
      })
      } catch (error) {
        res.json({
          status: "error",
          message: "class not added",
          moment
        })
      }
})

app.post("/class/:className/enroll", (req, res) => {
  let moment = req.timestamp
  let {className} = req.params
  let {name, age, grade, city} = req.body
  age = Number(age)
  grade = Number(grade)
  let student = {name,age,city,grade}

  // enrollStudent(className, student) {
  //   let newStudent = new Student(student.name,student.age,student.city,student.grade)
  //   this.classes[className]["students"].push(newStudent)
  //   return newStudent
  // }

  let info = theSchool.enrollStudent(className, student) 
  // console.log(info);
  // console.log(Number(age));
  


  try {
        res.json({
        payload: info,
        status: "success",
        message: "student added",
        moment
      })
      } catch (error) {
        res.json({
          status: "error",
          message: "student not added",
          moment
        })
      }
})