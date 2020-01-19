const express = require("express");
const cors =  require("cors");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;

// importing the school class into our server and creating a new instance of school via my newSchool variable.

const testSchool = require("./School.js")

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())

//routes/url things (generally for now)

app.get("/", (req, res) => {
    
})

app.get("/classes", (req, res) => {

})

app.get("/classes/:student", (req, res) => {
    
})

app.post("/classes/enroll/:student", (req, res) => {

})

app.delete("/classes/:student", (req, res) => {
    
})

app.delete("/classes/:className", (req, res) => {

})

app.post("/addClass/:className", (req, res) => {
    
})







app.listen(port, () => {
    console.log(`Listening on Port ${port}`)
})