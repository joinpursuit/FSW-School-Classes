const express = require('express')
const app = express()
const bodyParser = require ('body-parser')
const port = 8080;

app.use(bodyParser.urlencoded({
    extended: false
}))


const School = require('./School.js')
// const schools = []

let mySchool = new School();

//schools.push(mySchool)

// console.log(mySchool)

app.get('/all', (req,res) => {
    let allRequest = mySchool;
    res.send({ allRequest })
})

app.post("/addClass/:className/:teacher", (req, res) => {

let class_request = req.params.className;
let teacherName = req.params.teacher;
console.log(class_request, teacherName)

if(!class_request || !teacherName){
    res.send({
        error: "Missing Information"
    })
}else {
    res.send(mySchool.addClass(class_request, teacherName))   
}
})



// const Midwood = new School()
// Midwood.addClass('Algebra', 'Mr. Paul')
// Midwood.enrollStudent('Algebra', 'Kadijah')
//console.log(Midwood.classes.Algebra.students);

app.listen(port, () => {
    console.log("running")
})