const express = require("express")
const cors = require("cors")
const port = 4000;
const app = express()
const bodyParser = require("body-parser")
app.use(cors())
app.use(bodyParser.urlencoded({
    extended: false
}))

const Class = require("./Class.js")
const Student = require("./Student.js")
const School = require("./School.js")

app.use("/classes", Class)
app.use("Student",Student)
app.use("School",School)



app.listen(port, ()=>{
    console.log(`server is running at: ${port}` )
})