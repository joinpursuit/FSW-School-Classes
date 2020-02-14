const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const School = require("./School.js")

app.use(cors())

let mySchool = new School();

app.get("/", (req, res) => {
    res.json("working")
})

app.listen(port, () => console.log("You're on port", port))