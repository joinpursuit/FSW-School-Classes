const express = require("express")
const cors = require("cors")
const port = 4000;
const app = express()
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())
const classRouter = require("./routes/classes.js")
const studentRouter = require("./routes/students.js")

app.use("/classes", classRouter)
app.use("/students", studentRouter)

app.listen(port, ()=>{
    console.log(`server is running at: ${port}` )
})