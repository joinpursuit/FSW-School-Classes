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
  res.json({
    this.name = 
  });
})

module.exports = Class;
