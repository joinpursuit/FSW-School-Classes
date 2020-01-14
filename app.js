const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 3000;
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const School = require("./School.js");


let mySchool = new School();


app.get("/school", (req, res) => {
    res.json(mySchool);
})

app.post("/school/add/", (req,res) => {
    mySchool.addClass(req.body.name, req.body.teacher);
    console.log(mySchool);
    res.json(mySchool);
})

app.listen(port, () => console.log("Listening on port: ", port));