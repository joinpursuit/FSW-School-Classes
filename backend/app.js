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