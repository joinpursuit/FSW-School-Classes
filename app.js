const express = require("express");
const cors =  require("cors");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;

// importing the school class into our server and creating a new instance of school via my newSchool variable.

const School = require("./School.js")
let newSchool = new School()


app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.listen(port, () => {
    console.log(`Listening on Port ${port}`)
})