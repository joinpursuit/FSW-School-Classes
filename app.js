const express = require("express")
const cors = require("cors")
const School = require("./School.js")

const app = express()
app.use(cors())

const port = 3000

let mySchool = new School()


app.listen(port, () => {
    console.log("Server is running on port " + port)
})