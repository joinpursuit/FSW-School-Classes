const express = require("express");
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const port = 3000
const School = require("School")
const Class = require("Class")
const Student = require("Student")

app.use(cors());

let newSchool = new School()

app.use(bodyParser.urlencoded({
    extended: false
}))

const classRouter = require("./routes/class")

app.use("/class", classRouter)

app.listen(port, () => {
    console.log(`Ahoy there! Ye be listen'in to http://localhost:${port}`)
})