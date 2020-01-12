const express = require("express");
const cors = require("cors");
const bodyParse = require("body-parser");

const School = require("./classes/School.js");

const port = 3000;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); 

let mySchool = new School();

app.post("/class", (req, res) => {
    mySchool.addClass(req.body.name, req.body.teacher);
})

app.listen(port, () => console.log("Listening on port", port));