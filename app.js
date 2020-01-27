const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const time = require("express-timestamp")


const port = 3000

const classRouter = require('./Class.js')
const StudentRouter = require('./Student.js')

const app = express()
app.use(time.init);

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const School = require("./School.js")
const Student = require("./Student.js")
// const Classes = require("./Class.js")

let newSchool = new School();
app.get("/", (req, res) => {
    res.json(newSchool);
});

app.post("/class",(req, res) => {
    newSchool.addClass(req.body.name, req.body.teacher)
    res.json({ 
        "class": { "name": req.body.name, "teacher": req.body.teacher, "students": []},
        "message": "Created a new class",
        "timestamp": req.timestamp
      })
})




// app.get("/Student")

app.listen(port, () => {
    console.log("Listening to port ", + port)
})





  