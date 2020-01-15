//let mySchool = new School();
const Class = require('./Class');
const Student = require('./Student')
const School = require('./School.js')
const express = require('express')
const cors = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3000;
const classRouter = require('./routes/students/students.js')
const studentRouter = require('./routes/classes/classes.js')
const schoolRouter = require('./routes/school/schoolR.js')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cors())
app.use('/classes',classRouter)
app.use('/students',studentRouter)
app.use('/schoolR', schoolRouter)

app.get('/',(req,res) => {
    res.json(this.classes)
})



app.listen(port,() => {
    console.log('listening on port: ', port)
})