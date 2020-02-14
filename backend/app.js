const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser")
const time = require("express-timestamp")
const School = require("./School")

const port = 3000;
const app = express();

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json());
app.use(time.init)

let newSchool = new School();

app.get("/", (req,res,next) => {
    res.json("GET request on app.js")
})

app.post("/", (req,res,next) => {
    res.json("POST request on app.js")
})

app.post('/class/', (req, res, next) => {
    try {
        let addClass = newSchool.addClass(req.body.name, req.body.teacher);
        res.json({
            status: "success",
            message: "Add Class",
            name: req.body.name,
            teacher: req.body.teacher,
            addClass
        })
    } catch(err) {
        next(err)
    }
})

app.post('/class/:className/enroll', (req,res,next) => {
    try{
        let newStudent = newSchool.enrollStudent(req.params.className, req.body);
        res.json({
            status: "success",
            message: "Enroll Student",
            className: req.params.className,
            student: {name: req.body.name, age: req.body.age, city: req.body.city, grade: req.body.grade},
            newStudent
        })
    } catch(err) {
        next(err)
    }
})
// app.post("/class", (req,res) => {
//     mySchool.addClass(req.body.classname, req.body.teacher)
//     console.log(req.body)
//     res.json({ 
//         "class": { 
//             "name": req.body.classname, 
//             "teacher": req.body.teacher, 
//             "students": []
//         },
//         "message": "Created a new class",
//         "timestamp": Date.now()
//       })
// })

// app.post("/class/:classname/enroll", (req,res) => {
//     console.log(req.body)
// })

// app.get("/class/:classname/enroll", (req,res) => {
//     res.json({
//         params: req.params,
//         message: "you've reached get request to class 1 .. /class/:classname/enroll",   
//         timestamp: req.timestamp
//     })
// })


app.listen(port, () => {
    console.log("App is listening on port ", port)
})