const express = require("express")
const cors = require("cors")
const port = 4000;
const app = express()
const bodyParser = require("body-parser")
app.use(cors())
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

const classRouter = require("./routes/classes.js")
const studentRouter = require("./routes/students.js")
const Class = require("./Class.js")
const Student = require("./Student.js")
const School = require("./School.js")

app.use("/classes", classRouter)
app.use("/students", studentRouter)
app.use("Class",Class)
app.use("Student",Student)
app.use("School",School)


// let newCourse = new Class("Javascript", "Ladovsky")
// console.log(newCourse)
// let deja = new Student("Deja", "30", "Brooklyn", "99")
// console.log(deja)




app.listen(port, ()=>{
    console.log(`server is running at: ${port}` )
})