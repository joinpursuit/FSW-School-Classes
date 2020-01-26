const express = require("express")
const cors = require("cors")
const bodyParser = require('body-parser')
const School = require("./School.js")

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const port = 3000

let mySchool = new School()

const showAllCourses = (req, res) => {
    res.json({
        status: 200,
        message: "Recieved all courses",
        allCourses: mySchool.courses
    })
}

app.get("/course", showAllCourses)


app.post("/school", (req, res) => {
    mySchool.enrollStudent(req.body.name, req.body.age, req.body.city, req.body.grade)
    
})

app.get("/teacher", (req, res) => {
    const query = req.query
    res.send()
    
})


app.listen(port, () => {
    console.log("Server is running on port " + port)
})