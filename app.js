const express = require("express")
const cors = require("cors")
const app = express()
const bodyParser = require("body-parser")
const port = 3001
const School = require("./School.js")
const Student = require("./Student.js")

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/hello", function(req, res) {
  res.send("Hello World!")
})

app.get("/", function(req, res) {
  res.send("index page")
})

app.get("/class/:classname/students", function(req, res) {
  // res.send(req.params.classname);
  //json
  let s = new School()
  s.addClass("physics1", "mr.tang")
  s.addClass("physics2", "ms.maria")
    let st = new Student("hernandez", "8", "bronx", "12")
    let st2 = new Student("jon", "10", "queens", "11" )

    s.enrollStudent("physics1", st)
    s.enrollStudent("physics1", st2)
    s.enrollStudent("physics2", st2)
  res.json(s.getStudentsByClass(req.params.classname))
})






app.listen(port, () => {
  console.log("Listening on port " + port)
})
