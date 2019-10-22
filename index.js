const express = require('express')
const app = express()
const bodyParser = require ('body-parser')
const port = 8080;

app.use(bodyParser.urlencoded({
    extended: false
}))

const School = require('./School.js')
let mySchool = new School();

app.get('/all', (req,res) => {
    let allRequest = req.body;
    res.json({
        allRequest
    })
})

app.post("/addClass", (req, res) => {
let class_request = req.body;

if(!class_request.name || !class_request.teacher){
    res.send({
        error: "Missing Information"
    })
}else {
    res.send(class_request)   
}
})


// const Midwood = new School()
// Midwood.addClass('Algebra', 'Mr. Paul')
// Midwood.enrollStudent('Algebra', 'Kadijah')
//console.log(Midwood.classes.Algebra.students);

app.listen(port, () => {
    console.log("running")
})