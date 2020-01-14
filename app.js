const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const School = require("./School.js");
const displayTime = require("./build.js");

let mySchool = new School();




const port = 3000;

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}))



app.post("/class",(req,res)=> {
    res.json(mySchool);
});
app.post("/class/:name/:teacher",(req,res)=> {
    let name = req.params.name;
    let teacher = req.params.teacher;

    if(mySchool.classes[name]){
        res.json({
            "error": "Please fill out all the information or Class already exists",
            "timestamp": displayTime()
        })
    } else {
        mySchool.addClass(name,teacher);
        res.json({
            "class": mySchool.classes[name],
            "message": "Created a new class",
            "timestamp": displayTime()
        });

    }
})


















app.listen(port,()=> {
    console.log(`Server is running on port: ${port}`);
});