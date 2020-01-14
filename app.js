const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const School = require("./School.js")
const port = 3000
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
let mySchool = new School()




app.listen(port, () => {
  console.log(`The server is running on port ${port}`)
})