const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const timestamp = require("express-timestamp");
const School = require("./School.js");
const port = 3000;
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(timestamp.init);

let mySchool = new School();
mySchool.addClass("environmental_science", "Ms. Obot")
mySchool.enrollStudent("environmental_science", {name: "Jay Fowler", age: 25, city: "Bronx", grade: 91})
mySchool.enrollStudent("environmental_science", {name: "Perry Platypus", age: 6, city: "Fowlerton", grade: 91})
mySchool.enrollStudent("environmental_science", {name: "Peter Rollock", age: 45, city: "Bronx", grade: 55})
mySchool.addClass("world_history", "Mr. Urrico")
mySchool.enrollStudent("world_history", {name: "Jay Fowler", age: 25, city: "Bronx", grade: 96})
mySchool.enrollStudent("world_history", {name: "Carlos Bell", age: 25, city: "Bronx", grade: 86})
mySchool.enrollStudent("world_history", {name: "Floyd Mayweather", age: 41, city: "Calabasas", grade: 68})

app.get("/classes", (req, res) => {
  try {
    let {timestamp} = req
    res.status(200).json({
      status: "success",
      message: "Retrieved all classes",
      payload: mySchool.classes,
      timestamp
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: "No classes were found",
      payload: null,
      timestamp
    });
  }
});

app.post("/classes/add", (req, res) => {
  let {timestamp} = req
  let {className, teacher} = req.body
  try {
    let newClass = mySchool.addClass(className, teacher);
    res.json({
      status: "success",
      message: `${className} was added successfully.`,
      payload: newClass,
      timestamp
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Server is unable to create class",
      payload: null,
      timestamp
    });
  }
});

app.post("/classes/enroll", (req, res) => {
  
  try{
    let stuInfo = req.body
    mySchool.enrollStudent(stuInfo.class, {name: stuInfo.name, age: stuInfo.age, grade: stuInfo.grade, city: stuInfo.city})
    res.json({
      info: mySchool.classes[stuInfo.class].students,
      message: `${stuInfo.name} has been successfully enrolled in ${stuInfo.class}.`,
      timestamp: timestamp.init
    })
  } catch(err){
    console.log(err)
    res.json({
      error: "Student could not be enrolled. Student may already be in class. Please try again.",
      timestamp: req.timestamp
    })
  }
});

app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});
