const express = require('express');
const cors = require('cors');
const body = require('body-parser');
const axios = require('axios');

const School = require('./School');
const Student = require('./Student');
const Class = require('./Class');

const app = express();

app.use(cors());
app.use(body.urlencoded({extended: false}));

let mySchool = new School();

const timeStamp = () => {
    const date = new Date();
    return date;
}

const classExists 

app.get('/', (req, res) => {
    mySchool.addClass('math', 'John Cena');
    res.send(mySchool);
})

// Creating a new class
app.post('/class', (req, res) => {
    const name = req.body.name;
    const teacher = req.body.teacher;
    console.log(name)
    console.log(teacher)
    mySchool.addClass(name, teacher);
    const timestamp = timeStamp();
    const message = 'Created a new class';
    const classObj = mySchool['classes'][name];
    console.log(classObj)

    res.json({
        class : classObj,
        message,
        timestamp
    })
})

const port = 8000;

app.listen(port, () => {
    console.log(`Live at http://localhost:${port}`);
})