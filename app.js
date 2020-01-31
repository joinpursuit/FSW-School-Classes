const express = require("express");
const cors = require("cors");
// const axios = require("axios");
const body  = require("body-parser");
const mySchool = require('./School')

const port = 3000;

const app = express();
app.use(cors());
app.use(body.urlencoded({extended: false}));

// let mySchool = new School();

const getAllClasses = (req, res) => {
    console.log("these are the classes" + mySchool.classes)
    res.json({
        allClasses: mySchool.classes
        
    })
}

const checkIfClassExists = (req, res, next) =>  {
        
    if (req.class) {
        //here logic for if input != req.body.class then add the class
        res.status(200).json({//chain it to send back a json and let it know it's all good
        message: "Success your class has been added!",
        data: req.class

        })
    } else {
        res.status(400).json({
            message: "That class already exsists, add another"
        })
        }
    next();
}

// const addNewClass = (req, res) => {
//do you just need/want a fucntion??
// }

const addNewClass = (req, res) => {
    console.log(req.params);
}

app.get("/addClass/:className/:teacher", (req, res) => {
    console.log(req.params);
    className = req.params.className;
    teacher = req.params.teacher;

    newClass = [{"className": className, "teacher":teacher}]
    res.json(newClass);
        
    //am I doing this right to get a new class inside of the class object
})

app.get("/class", getAllClasses)
app.post("/class",checkIfClassExists, addNewClass)



app.listen(port, () => {
    console.log("app is listening on port: " + port)
})


