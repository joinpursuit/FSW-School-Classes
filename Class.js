// const classes = require("express").Router()
// const bodyParser = require("body-parser")

//classes.use(bodyParser.urlencoded({extended:false})
//classes.use(bodyParser.json())

class Class {
  constructor(name, teacher) {
    this.name = name
    this.teacher = teacher
    this.students = []
  }
}

module.exports = Class;
