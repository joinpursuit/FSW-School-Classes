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
const schoolRouter = require('./routes/school/school.js')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cors())
// app.use('/classes',classRouter)
// app.use('/students',studentRouter)
app.use('/school', schoolRouter)

app.get('/',(req,res) => {
    res.json({
        status: 200,
        message: "This is running, try other routes"
    })
})

app.post('/class',(req,res) => {
    let { name , teacher } = req.body
    
    let aClass = newSchool.addClass(name,teacher)
    res.json({aClass,
        "message": "Created a new class",
        "timestamp": "YYYY, MM/DD HH:MM:SS"})
})

// app.get('/',(req, res) => {
//     res.json(req.body) // req . params
// })



app.listen(port,() => {
    console.log('listening on port: ', port)
})

// newSchool.addClass('math', 'allen J')