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
mySchool.addClass

app.get("/classes", (req, res) => {
  try {
    res.json({
      classes: mySchool.classes,
      message: "Request has been completed successfully",
      timestamp: req.timestamp
    });
  } catch (err) {
    res.json({
      error: "Your request could not be completed",
      timestamp: req.timestamp
    });
  }
});

app.post("/classes/add", (req, res) => {
  try {
    mySchool.addClass(req.body.class, req.body.teacher);
    res.json({
      message: `${req.body.class} was added successfully.`,
      timestamp: req.timestamp
    });
  } catch (err) {
    console.log(err);
    res.json({
      error:
        "Class could not be created. Class may already exist. Please try again.",
      timestamp: req.timestamp
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
