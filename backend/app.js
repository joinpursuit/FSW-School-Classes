const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const port = 8000

const Student = require('./modules/Student.js')
const School = require('./modules/School.js')
const Class = require('./modules/Class.js')

let mySchool = new School() 

app.use(cors())

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Routes work as intended')
})

const timestamp = () => new Date().toLocaleString()

app.post('/class', (req, res)=> {
    const {name, teacher} = req.body
    // console.log( 'req.body:',name, teacher)

    console.log(mySchool.classes)

    try{
        res.json({
            class: mySchool.addClass(name, teacher),
            message: 'Created a new class',
            timestamp: timestamp()
        })
    } catch (error){
        res.json({
            error:"Please fill out all the information or Class already exists",
            timestamp: timestamp()
        })
        console.log(error)
    }
    
})

app.post('/class/:classname/enroll', (req, res) => {
    const {name, age, city, grade} = req.body
    const className = req.params.classname

    try{
        res.json({
            studentObj: mySchool.enrollStudent(className, req.body),
            message: 'Enrolled student',
            timestamp: timestamp()
        })
    } catch (error){
        res.json({
            message: 'Please fill out all the information for the student',
            timestamp: timestamp()
        })
        console.log(error)
    }
})

app.get('/class/:classname/students', (req, res) => {
    // const 
})

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`)
})

