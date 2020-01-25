const students = require("./node_modules/express").Router();
const cors = require("./node_modules/cors")
const bodyParser = require("./node_modules/body-parser")
const {} = require("..")
const studentsRouter = require("./node_modules");

const port = 3000; 


class Student {
  constructor(name, age, city, grade) {
    this.name = name
    this.city = city
    this.age = age
    this.grade = grade
  }
}

//add{
  router.post("/add", (req, res) => {
    let resp = req.body
    if(req.body.name && req.body.city && req.body.age && req.body.grade) {
      req.body.students = req.body.students.split(' ')
      Student.push(req.body);
      res.status(200).json({
        student: " ", 
        className: " ",
        message: "Enrolled Student",
        timestamp: "YYYY, MD/DD HH:MM:SS",
        data: req.body
  
  })
    }else{
      res.status(400).json({
        error: "Please fill out all the information for the student",
        timestamp: "YYYY, MD/DD HH:MM:SS"
      })
    }


    router.patch("/update/:student", (req, res) => {
      //before => req.params.name
      let { name } = req.params;
      //after ^^^ => name;
      console.log(student)
      //look through arr of object 
      cookBook.forEach(cookBook => {
        //if(name === cookBook.name)
        if(name === recipe.name) {
          recipe = req.body
        }
      })
      res.status(200).json({
        message: "Recipe Updated",
        newRecipe: req.body
      })
      console.log("This req.body", req.body)
    
    })




  })

module.exports = students;
