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
  theSchool.enrollStudent("History",{"Manny",16,"Bronx",55})
  theSchool.enrollStudent("History",{"Emma",14,"Queens",70})
  theSchool.enrollStudent("Spanish",{"Max",16,"Brooklyn",90})
  theSchool.enrollStudent("Spanish",{"Charlie",15,"Manhattan",55})
  theSchool.enrollStudent("Science",{"Dave",14,"bronx",55})
  theSchool.enrollStudent("Science",{"Sarah",18,"Bronx",65})
  theSchool.enrollStudent("Math",{"Lyn",17,"Manhattan",55})
  theSchool.enrollStudent("Math",{"Carla",15,"Bronx",80})