//let mySchool = new School();
const express = require('express')
const cors = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3000;
const classRouter = require('./routes/students/students.js')
const studentRouter = require('./routes/classes/classes.js')
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cors())
app.use('/classes',classRouter)
app.use('/students',studentRouter)





app.listen(port,() => {
    console.log('listening on port: ', port)
})