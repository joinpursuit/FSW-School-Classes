const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser")
const time = require("express-timestamp")

const School = require("./School")

port = 5000;
const app = express();
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json());
app.use(cors())
app.use(time.init)

let mySchool = new School();
console.log(mySchool)
console.log(mySchool)
mySchool.enrollStudent("algebra")
console.log(mySchool)
mySchool.getStudentsByClass("algebra")

app.get('/', (req, res) => {
    console.log('youve hit GET/ endpoint', mySchool)
    res.json({
        message: 'youve hit GET/ endpoint',
        school: mySchool,
    })
})

app.post("/class", (req,res) => {
    mySchool.addClass(req.body.classname, req.body.teacher)
    console.log(req.body)
    res.json({ 
        "class": { 
            "name": req.body.classname, 
            "teacher": req.body.teacher, 
            "students": []
        },
        "message": "Created a new class",
        "timestamp": Date.now()
      })
})

app.post("/class/:classname/enroll", (req,res) => {
    console.log(req.body)
    // res.json({
    //     body: req.body,
    //     params: req.params,
    //     message: "you've reached post request to class 1 .. /class/:classname/enroll",
    //     timestamp: req.timestamp
    // })
})

app.get("/class/:classname/enroll", (req,res) => {
    res.json({
        params: req.params,
        message: "you've reached get request to class 1 .. /class/:classname/enroll",   
        timestamp: req.timestamp
    })
})

app.get("/", (req,res) =>{
    res.json("Hello School")
})

app.listen(port, () => {
    console.log("App is listening on port ", port)
})