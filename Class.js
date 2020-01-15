const express = require("express");
const classRoute = express.Router({mergeParams: true});

class Class {
  constructor(name, teacher) {
    this.name = name
    this.teacher = teacher
    this.students = []
  }
}

classRoute.get("/", (req, res) => {
  if(class) 
  
  res.json({
    this.name = 
  });
})

classRoute.post("/:className/enroll", (req, res) => {

})

classRoute.get("/:className/students", (req, res) => {
  
})

module.exports = Class;
