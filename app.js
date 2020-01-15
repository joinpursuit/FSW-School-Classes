const express = require("express");
const cors = require("cors");

const port = 3000;

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

let myschool = new School();

app.get("/", (req, res) => {
    res.json("Hello Wellcome to Jay World")
})

app.post("/class", (req, res) => {
    res.json("Updating classes")
})

app.post("/class/:class-name/enroll", (req, res) => {
    res.json("Updating class enrollment")
})

app.get("/class/:class-name/students", (req, res) => {
    res.json("List of students")
})

app.listen(port, () => {
    console.log("listening on port: ", port)
});



