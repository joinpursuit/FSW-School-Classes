const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const pgp = require("pg-promise")({});
const connectionString = "postgres://localhost:5432/my_school_database";
const db = pgp(connectionString);

const School = require("./classes/School.js");

const port = 3000;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); 

let mySchool = new School();

const isClassAdded = async (newClass) => {
    let classes = await db.any('SELECT * FROM classes WHERE class_name=${name} ' +
                               'AND teacher=${teacher}', newClass);
    
    if(classes.length) {
        return true;
    } else {
        return false
    }
}

app.post("/class", async (req, res) => {
    // addClass returns false if the information is incorrect/class exists
    // Checking if addClass returns false, if it does an error is sent
    let newClass = req.body;

    if(await isClassAdded(newClass)) {
        res.status (400).json({
            error: "Class already exists",
            "timestamp": new Date()
        })
    } else {
        db.none('INSERT INTO classes(class_name, teacher) VALUES(${name}, ${teacher})', newClass).then(() => {
            res.status (200).json({
                class: req.body,
                message: "created a new class",
                timestamp: new Date().toString()
            })
        })
    }
})

app.post("/class/:className/enroll", (req, res) => {
    let className = req.params.className;
    req.body.name = req.body.firstName + " " + req.body.lastName;
    let student = req.body;

    // enrollStudent returns false if student information is incorrect
    // Checking if false is returned, if it is then an error is sent
    if(mySchool.classes[className.toLowerCase()]) {
        mySchool.enrollStudent(className, req.body);
        res.json({ 
            student: req.body,
            className: className,
            message: "Enrolled Student",
            timestamp: new Date().toString()
        })
        
    } else {
        res.json({
            error: `Class ${className} doesn't exist.`,
            timestamp: new Date().toString()
        })
    }
})

app.get("/class/:className/students", (req, res) => {
    let className = req.params.className;
    let city = req.query.city;
    let failing = req.query.failing;
    
    if(mySchool.classes[className.toLowerCase()]) {
        res.json({
            // If city or failing queries are passed, then WithFilter version of getStudentsByClass runs
            // Otherwise the normal version runs
            students: (city || failing) ? mySchool.getStudentsByClassWithFilter(className, failing, city) : mySchool.getStudentsByClass(className),
            message: "Retrieved students",
            timestamp: new Date().toString()
        }) 
    } else {
        res.json({
            error: `Class ${className} doesn't exist.`,
            timestamp: new Date().toString()
        })
    }
})

app.listen(port, () => console.log("Listening on port", port));