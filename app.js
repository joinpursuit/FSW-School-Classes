const express = require("express");
const cors = require("cors");
const port = 3000;
const app = express();
const bodypaser = require("body-parser")
app.use(cors());
app.use(bodypaser.urlencoded({extended: false}));
app.use(bodypaser.json());

const School = require("./School.js");
const Student = require("./Student.js");

let mySchool = new School();

app.get("/", (req, res)=>{
   let {name, teacher} = req.body;

    if(!mySchool.classes.hasOwnProperty(name) && name !== "" && teacher !== ""){
        mySchool.addClass(name, teacher);
        res.json({
            class: { name: name, teacher: teacher, students:[]},
            message: "Created a new class",
            timestamp: new Date().toString()
          });
    }else{
        res.json({
            error: "Either some information is missing or the class already exist",
            timestamp: new Date().toString()
              
        });
    }
})

app.post("/class", (req, res)=>{

        let newClass = mySchool.addClass(req.body.name, req.body.teacher);
        res.json(newClass);
        console.log(newClass)

});



app.listen(port,() =>{
    console.log("Listening to port " + port)
})