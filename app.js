const express = require("express");
const cors =  require("cors");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;
const School = require("./backend/School");

let mySchool = new School();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.post("/class", (req, res, next) => {
     res.json("Added a class!")
});

app.post("/class/:className/enroll", (req, res, next) => {
    res.json("enrolled a new student")
})

app.get("/class/:className/students", (req, res, next) => {
    res.json("got all students for a class!")
})


app.listen(port, () => {
    console.log(`Listening on Port ${port}`)
});