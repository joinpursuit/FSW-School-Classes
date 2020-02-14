const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;
const School = require("./School.js");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let mySchool = new School();

app.post("/class", (req, res) => {
    try {
        let className = req.body.name;
        let classTeacher = req.body.teacher;
        mySchool.addClass(className, classTeacher);
        res.json({
            class: {className,classTeacher,students: []},
            status: "success",
            message: "new class added"
        });
    } catch (err) {
        console.log(err)
    }
})

app.get("/", (req, res) => {
    res.json("working")
})

app.listen(port, () => console.log("You're on port", port))