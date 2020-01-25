//let mySchool = new School();
const Class = require('./Class');
const Student = require('./Student')
const School = require('./School')
const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const port = 3000;
const newSchool = new School();
// const classRouter = require('./routes/students/students.js')
// const studentRouter = require('./routes/classes/classes.js')
//const schoolRouter = require('./routes/school/school.js')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cors())
// app.use('/classes',classRouter)
// app.use('/students',studentRouter)
//app.use('/school', schoolRouter)

let now = new Date()
const classesCheck = (req, res, next) => {
    if(newSchool['classes'][req.body.name]){
        res.json({ 
            "error": "Please fill out all the information for the student",
            "timestamp": now.toString(Date.now())
          })
    }else {
        next()
    }
}

app.get('/allClasses',(req,res) => {
    res.json({
        newSchool,
        status: 200,
        message: "This is running, try other routes"
    })
})

app.post('/class',classesCheck,(req,res) => {
    let { name , teacher } = req.body
    
    let addedClass = newSchool.addClass(name,teacher)
    res.json({addedClass,
        "message": "Created a new class",
        "timestamp": now.toString(Date.now())}) //"YYYY, MM/DD HH:MM:SS"
})

// app.get('/',(req, res) => {
//     res.json(req.body) // req . params
// })



app.listen(port,() => {
    console.log('listening on port: ', port)
})

// newSchool.addClass('math', 'allen J')