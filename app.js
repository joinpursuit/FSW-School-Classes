const School = require('./School.js');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const port = 3000;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));


// const classRouter = require("./Class.js");
// const schoolRouter = require("./School.js");
// const studentRouter = require("./Student.js");

// app.use("/class", classRouter);
// app.use("/School", schoolRouter);
// app.use("/Student", studentRouter);

let mySchool = new School();


app.get("/class", (req, res) => {
    try {

        debugger;
    } catch(error) {
        res.json({ 
            "error": "Please fill out all the information or Class already exists",
            "timestamp": "YYYY, MM/DD HH:MM:SS"
        });
    };
    // console.log(req)
});

app.post("/:name/enroll", (req, res) => {
    try {

    } catch(error) {
        
    };
});

app.get("/:className/students", (req, res) => {
    try {

    } catch(error) {

    };
});

// app.post("/users", (req, res) => {
//     res.json("created a new user");
// })

// app.get("/posts", (req, res) => {
//     res.json("returns all posts");
// })

// app.get("/posts/:id", (req, res) => {
//     res.json("returns a specific post")
// })

// app.get("/users/:id/posts", (req, res) => {
//     res.json("all the posts for a specific user");
// })


app.listen(port, () => {
    console.log("Listening on port: ", port);
})