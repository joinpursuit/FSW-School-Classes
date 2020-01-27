const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const time = require("express-timestamp")


const port = 3000

const classRouter = require('./Class.js')
const StudentRouter = require('./Student.js')
const SchoolRouter = require("./School.js")

const app = express()
app.use(time.init);

app.use(cors())
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

const School = require("./School.js")
const Student = require("./Student.js")
// const Classes = require("./Class.js")

let mySchool = new School();


app.get("/", (req, res) => {
    res.json(newSchool);
});


// adding a class 

// app.post("/class", (req, res) => {
//             if (!mySchool.addClass(req.body.name, req.body.teacher)) {
//                 res.json({
//                     "error": "Please fill out all the information or Class already exists",
//                     "timestamp": req.timestamp
//                 })
//             } else {
//                 res.json({
//                         "class": {
//                             "name": req.body.name,
//                             "teacher": req.body.teacher,
//                             "students": []
            
//                         })
//                 )
//         })

            app.post("/class", (req, res) => {
                try {
                    // let addNewClass = mySchool.addClass
                    mySchool.addClass(req.body.name, req.body.teacher);
                    // if(newSchool.classes === req.body.name || req.body.teacher)
                    res.json({
                        "class": {
                            "name": req.body.name,
                            "teacher": req.body.teacher,
                            "students": []
                        },
                        "message": "Created a new class",
                        "timestamp": req.timestamp
                    })
                } catch (err) {
                    res.json({
                            "error": "Please fill out all the information or Class already exists",
                            "timestamp": req.timestamp
                        }

                    )
                }
            })


            //enrolling a student in a class
            app.post("/class/:className/enroll", (req, res) => {
                try {
                    mySchool.enrollStudent(req.body.studentName, req.body.age, req.body.city, req.body.grade);
                    res.json({
                        "student": {
                            "name": req.body.studentName,
                            "age": req.body.age,
                            "city": req.body.city,
                            "grade": req.body.grade
                        },
                        "className": req.body.className,
                        "message": "Enrolled Student",
                        "timestamp": req.timestamp
                    })
                } catch (err) {
                    res.json({
                        "error": "Please fill out all the information for the student",
                        "timestamp": req.timestamp
                    })
                }
            })



            // list all enrolled students in class


            app.get("/class/<class-name>/students", (req, res) => {
                try {
                    mySchool.getStudentsByClass(req.body.className, req.body.failing, req.body.city);
                    res.json({
                        "students": [{
                                "name": req.body.name,
                                "age": req.body.age,
                                "city": req.body.city,
                                "grade": req.body.grade
                            },
                            {
                                "name": req.body.name,
                                "age": req.body.age,
                                "city": req.body.city,
                                "grade": req.body.grade
                            }
                        ],
                        "message": "Retrieved Students",
                        "timestamp": req.timestamp
                    })
                } catch (err) {
                    res.json({
                        "error": "Class doesn't exist.",
                        "timestamp": req.timestamp
                    })
                }
            })



            // app.get("/Student")

            app.listen(port, () => {
                console.log("Listening to port ", +port)
            })