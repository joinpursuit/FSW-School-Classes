const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const port = 3000;
const app = express() 
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors())

//let mySchool = new School();

const classRouter = require('./class_router')

app.use('/class', classRouter);


app.listen(port, () => {
 console.log(`Listening on port ${port}`)
})
