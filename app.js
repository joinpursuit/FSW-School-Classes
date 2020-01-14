const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const school = require("./School.js");
const app = express();
const port = 3000;

let mySchool = school;

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.listen(port, () => console.log("Listening to port", port));