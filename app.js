const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const port = 3000;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));


const classRouter = require("./Class.js");
const schoolRouter = require("./School.js");
const studentRouter = require("./Student.js");

app.use("/Class", classRouter);
app.use("/School", schoolRouter);
app.use("/Student", studentRouter);

app.get("/", (req, res) => {
    let mySchool = new School();
    // res.json({
    // });
})

app.listen(port, () => {
    console.log("Listening on port: ", port);
})