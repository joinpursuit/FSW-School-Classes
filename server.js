const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const School = require('./school.js')
let mySchool = new School();


const app = express();
app.use(cors())

console.log("schools", School)
console.log(mySchool.addClass("Chemistry", "JRJ"))
// const schoolClass = schools.