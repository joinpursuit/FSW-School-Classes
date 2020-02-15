const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const School = require("./School.js");
const port = 3000;
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let mySchool = new School();

app.get("/classes", (req, res) => {
    try{
        res.json({
            classes: mySchool.classes,
        })
    }catch(err){
        console.log(err)
        res.json({
            message:"You got an error",
            status:"Error"
        })
    }
})

app.post("/classes/add", (req,res) => {
    try{

    }catch(err){
        console.log(err)
        res.json({
            message:"You hit an error",
            status:"Error"
        })
    }
})

app.post("/classes/enroll", (req,res) => {
    try{

    }catch(err){
        console.log(err)
        res.json({
            message:"An error was hit",
            status:"Error"
        })
    }
})

app.listen(port, () => {
    console.log(`The server is running on port ${port}`);
  });