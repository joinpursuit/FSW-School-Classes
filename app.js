const express = require("express");
const cors = require("cors");
const time = require("express-timestamp");
const bodyParser = require("body-parser");
const port = 3000;
const app = express();
const School = require('./School');

let colegio = new School();
//import school
//create new instance of school


app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

//create all routes and test them by using console.log

//start adding functionality to each route




app.listen(port, () => {
    console.log("listening to port", port);
})