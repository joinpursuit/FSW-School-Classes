const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const timestamp = require("express-timestamp")
const School = require("./School.js")
const port = 3000
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(timestamp.init)

let mySchool = new School()

app.post("/classes/add", (req, res) => {
  try{
    mySchool.addClass(req.body.class, req.body.teacher)
  res.json({
    message: "The class was added successfully.",
    timestamp: req.timestamp
  })
  } catch(err){
    res.json({
      error: "Class could not be created. Class may already exist, please try again.",
      timestamp: req.timestamp
    })
  }
  
})
app.listen(port, () => {
  console.log(`The server is running on port ${port}`)
})
