const express = require("express")
let cors = require("cors")
const Student = require("../Student")
const School = require("../School")
const classes = require("express").Router()
let mySchool = new School();

classes.post("/", (request, response)=>{
let nameOfClass = request.body.nameOfClass;
let nameOfTeacher = request.body.nameOfTeacher;

})
classes.patch("/", (request, response)=>{
let nameOfClass = request.body.nameOfClass;
})
classes.get("/",(request, response)=>{
    
})

module.exports = classes;