const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser")

port = 5000;
const app = express();

// let mySchool = new mySchool();

app.get("/", (req,res) =>{
    res.json("Hello School")
})

app.get("/school/courses", (req,res) => {
    res.json([1,2,3])
})

app.listen(port, () => {
    console.log("App is listening on port ", port)
})