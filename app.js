//let mySchool = new School();
const express = require('express')
const cors = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3000;
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cors())
app.use('/classes',classesRouter)
app.use('/students',studentsRouter)





app.listen(port,() => {
    console.log('listening on port: ', port)
})