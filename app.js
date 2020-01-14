//let mySchool = new School()
const cors = require("cors")
const express = require("express")
const app = express()
const port = 6000
const usersRouter = require()
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

 app.use("school", usersRouter)
 app.use("class", usersRouter)

app.listen(port,()=>{
    console.log("listening to port", port)

})