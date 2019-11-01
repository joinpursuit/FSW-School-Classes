const express = require("express");

// const School = require("../types/School")

// const Student = require("../types/Student")

// const Class = require("../types/Class")

const app = express(); 

const cors = require("cors");

const bodyParser = require("body-parser")

const port = 4000; 

// const classRouter = require('./routes/classRouter.js')
// app.use('/class', classRouter);

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

const addClass = (req, res, next) => {
    // let newClass = 
}

const enrollStudent = (req, res, next) => {
    let name = req.body.data.name;
    
    let age = req.body.data.name;
}

// let newSchool = new School()
app.post("/class", addClass)


app.get("/School", (req, res, next) => {
    res.send("this is /school")
})
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})

