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
let newSchool = new School()
app.get("/School", (request,response)=>{
    response.json(newSchool.classes)
})
app.post("/School/addclass", (request, response)=>{
    newSchool.addClass(request.query.name, request.query.teacher)
    response.json({
        "class": {"teacher": request.query.teacher, "classes": request.query.classes, "students": []},
        "message": "add name of Class and teacher",
        "dateadded": new Date()
    })
})
app.post("/School/addstudent", (request, response)=>{
    newSchool.enrollStudent(request.params.class, request.body)
    response.json({
        "student":{"name": request.body.name, "age": request.body.age, "city": request.body.city, "grade": request.body.grade},
        "nameOfClass": request.params.nameOfClass,
        "message": "enrolled",
        "date": new Date()

    })

})
app.get("/", (request, response)=>{
    response.json("/ url")
})



app.listen(port, ()=>{
    console.log(`server is running at: ${port}` )
})