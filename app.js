const express = require("express")
const cors = require("cors")
const app = express()
const bodyParser = require("body-parser")
const port = 3001
const School = require("./School.js")
const Student = require("./Student.js")
const classesRouter = require("./routes/classesRouter.js")

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use("/class", classesRouter)

// app.get("/hello", function(req, res) {
//   res.send("Hello World!")
// })

// app.get("/", function(req, res) {
//   res.send("index page")
// })

// app.post("/class/:classname/students", function(req, res) {
// //   let skl = new School()
// //   skl.addClass("physics1", "mr.tang")
// //   skl.addClass("physics2", "ms.maria")

// //     let st = new Student("hernandez", "8", "bronx", "12")
// //     let st2 = new Student("jon", "10", "queens", "11" )
// // // console.log("we loggin")
// //     skl.enrollStudent("physics1", st)
// //     skl.enrollStudent("physics1", st2)
// //     skl.enrollStudent("physics2", st2)
// //   res.json(skl.getStudentsByClass(req.params.classname))

//   res.json("this works")

// })

// // addClass(name, teacher) {
// //   let newClass = new Class(name, teacher);
// //   this.classes[name] = newClass;

// app.post("/class/:name/:teacher", )

app.listen(port, () => {
  console.log("Listening on port " + port)
})
