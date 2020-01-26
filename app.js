const express = require("express");
const cors =  require("cors");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;
const school = require("./School.js")

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send(school.classes)
})
app.post("/class/:className/addClass", (req, res) => {
    res.send(req.body)
})

// app.get("/classes/:className", (req, res) => {
//     res.json(school.getStudentsByClass(req.params.className))
// })

// app.post("/classes/enroll/:className", (req, res) => {
//     console.log(req.body, req.params.className)
//     res.json(school.enrollStudent(req.params.student, req.params.className))
// })

// app.get("/classes/filter/:className", (req, res) => {
// })


app.listen(port, () => {
    console.log(`Listening on Port ${port}`)
})