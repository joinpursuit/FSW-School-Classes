let mySchool = new School()
const cors = require("cors")
const express = require("express")
const app = (express())
const port = 6000

app.use("school", usersRouter)
app.use("class", usersRouter)

