const classesRouter = require("express").Router()
const mySchool = require("./../School.js")


classesRouter.post("/", (req, res) => {
  res.json(req.body)
})

classesRouter.post("/add", (req, res) => {
  let classNames = req.body.name
    if (mySchool.classes[classNames]) {
    res.json({
      error: "Please fill out all the information for the student",
      timestamp: "YYYY, MM/DD HH:MM:SS"
    })
  } else {
    mySchool.addClass(req.body.name, req.body.teacher)
    res.json({
      class: {
        name: `${req.body.name}`,
        teacher: `${req.body.teacher}`,
        students: []
      },
      message: "Created a new class",
      timestamp: "YYYY, MM/DD HH:MM:SS"
    })
  }
})

classesRouter.post("/:className/enroll", (req, res) => {
    let className = req.params.className
    let name = req.body.name
    let age = req.body.age
    let city = req.body.city
    let grade = req.body.grade

    // if (mySchool.students.includes(name))
    let studentArr = mySchool.classes[className].students 
    studentArr.forEach(student => {
        
        if (student.name !==  name ) {
            // res.json("yes") ASK FOR HELP
            student.name = name
            student.age = age
            student.city = city
            student.grade = grade
            res.json(studentArr)
        } else if(student.name === name) {
            res.json("yo")
        }
    })
            
        
    

})




module.exports = classesRouter
