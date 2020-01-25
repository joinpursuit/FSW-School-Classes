const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")

const port = 3000

const classRouter = require('../Class')
const StudentRouter = require('../Student')

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/", (req, res) => {
    res.json("Loading Student Center")
})

app.get("/class",(req, res) => {
    res.json("class")
})

app.get("/Student",(req, res) => {
    res.json(students)
})

app.get("/class/:name",(req, res) => {
    res.json(req.params.name)
})

app.get("/class/:teacher", (req, res) => {
    res.json(req.params.teacher)
})

app.get("/class/:students", (req, res) => {
    res.json(req.params.students)
})

// app.get("/Student")

app.listen(port, () => {
    console.log("Listening to port ", + port)
})





  