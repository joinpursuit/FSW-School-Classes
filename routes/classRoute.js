const route = require('express').Router();
const cors = require("cors");
const School = require("../School.js");
const Student = require("../Student.js")


route.use(cors())
let mySchool = new School()


route.get("/:className/students", (req, res) => {
    let className = req.params.className
    res.json(mySchool.getStudentsByClass(className));

})

route.get("/:className/students/:failing", (req, res) => {
    let className = req.params.className
    let failing = req.params.failing
    res.json(mySchool.getStudentsByClassWithFilter(className, failing));
})

route.post("/:name/:teacher", (req, res) => {
    let name = req.param.name
    let teacher = req.param.teacher

    try {
         res.json({
             class: (mySchool.addClass(name, teacher)),
             message: "Created new class",

         })
    } catch (err){
        res.json({
            "error": "Please fill out all the information or Class already exists"
        })
        console.log(err)
    }

})


















module.exports = route;