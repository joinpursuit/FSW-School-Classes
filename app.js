const express = require("express");
const cors = require("cors");
const port = 3000;
const app = express();
const bodypaser = require("body-parser")
app.use(cors());
app.use(bodypaser.urlencoded({extended: false}));
app.use(bodypaser.json());

const School = require("./School.js");

let mySchool = new School();

app.get("/school", (req, res)=>{
    res.json(mySchool);
})

app.post("/school/:add", (req, res)=>{
    mySchool.addClass(req.body.name, req.body.teacher);
    console.log(mySchool)
    res.json(mySchool);
})



app.listen(port,() =>{
    console.log("Listening to port " + port)
})