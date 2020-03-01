const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const timestamp = require("express-timestamp");
// const School = require("./School.js");
const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(timestamp.init);



const School = require("../models/School");
const Student = require("../models/Student");



let mySchool = new School();

//try
// mySchool.addClass("Transfiguration", "Ms. Minerva McGonagall");
// mySchool.addClass("Potions", "Mr. Severus Snape");
// mySchool.addClass("Defense Against the Dark Arts", "Mr. Rubeus Hagrid");
// mySchool.addClass("Herbology", "Ms. Pomona Sprout");
// mySchool.addClass("Charms", "Mr. Filius Flitwick");
// mySchool.enrollStudent("Transfigurations", {name: "Harry Potter", age: 22, city: "Godric Hallows", grade: 86.5, house: "Gryffindor"})
// mySchool.enrollStudent("Transfigurations", {name: "Harry Potter", age: 22, city: "Godric Hallows", grade: 86.5, house: "Gryffindor"})
// mySchool.enrollStudent("Transfigurations", {name: "Harry Potter", age: 22, city: "Godric Hallows", grade: 86.5, house: "Gryffindor"})
// mySchool.enrollStudent("Transfigurations", {name: "Harry Potter", age: 22, city: "Godric Hallows", grade: 86.5, house: "Gryffindor"})
// mySchool.enrollStudent("Transfigurations", {name: "Harry Potter", age: 22, city: "Godric Hallows", grade: 86.5, house: "Gryffindor"})
// mySchool.enrollStudent("Transfigurations", {name: "Harry Potter", age: 22, city: "Godric Hallows", grade: 86.5, house: "Gryffindor"})


//Getting all classes in Hogwarts
app.get("/class", (req, res) => {
    try {
        res.json({
            class: mySchool.classes,
            message: "You recieved all the classes at Hogwarts.",
            timestamp: req.timestamp
        });
    } catch (error) {
    res.json({
      error: "Error. Classes at Hogwarts are invisible.",
      timestamp: req.timestamp
    });
  }
});

// Adding a new class 
app.post("/class/add", (req, res) => {
    try {
      mySchool.addClass(req.body.name, req.body.teacher);
      res.json({
        message: `${req.body.name} was added to the list of classes being taught at Hogwarts. ${req.body.teacher} will now be leading the class.`,
        timestamp: req.timestamp
      });
    } catch (err) {
      console.log(err);
      res.json({
        message: "This class can not be created at this time. Try again or speak to Dumbledor.",
        timestamp: req.timestamp
      });
    }
  });

//Displaying a class with all it's students 
app.get("/class/:className", (req, res) => {
  if (mySchool.classes[req.params.className]) {
    let allStudents = mySchool.classes[req.params.className].students;
    res.json({
      allStudents: allStudents,
      "message": `You have summonded all the students in the ${req.params["className"]} class.`,
      "timestamp": req.timestamp
    })
  } else {
    res.json({
      "message": `No students can be summonded from the ${req.params["className"]} class. Please speak to Dumbledor.`,
      "timestamp": req.timestamp
    })
  }
})


// Enrolling a new student
app.post("/class/:className/enrollStudent", (req, res) => {
    try {
        if(mySchool.enrollStudent(req.params.className, req.body));
        // console.log('in enroll student req.body',req.body)
        res.json({
                "student": { "name": req.body.name, "age": req.body.age, "city": req.body.city, "grade": req.body.grade, "house": req.body.house},
                "className": req.params["className"],
                "message": `${req.body.age} year old ${req.body.name} from ${req.body.city} is now enrolled in the ${req.params.className} class with a GPA of ${req.body.grade}. They will be a part of the ${req.body.house} house.`,
                timestamp: req.timestamp
        });
    } catch(err) {
      console.log(err)
        res.json({
            "message":`${req.body.age} year old ${req.body.name} with a GPA of ${req.body.grade} from ${req.body.city} CAN NOT be enrolled in the ${req.body.class} class. Please speak to Dumbledor. They are not allowed in the ${req.body.house} house.`,
            timestamp: req.timestamp
        })
    }
});

// Getting students that failed
app.get("/class/:className/students", (req, res) => {
    try {
        if(mySchool.getStudentsByClassWithFilter([req.params.className], req.body.name, req.body.failing, req.body.city));
        res.json({
            "students": [{ "name": req.body.name, "age": req.body.age, "city": req.body.city, "grade": req.body.grade, "house":req.body.house },
            // { "name": "Ron Weasley", "age": 23, "city": "Manchester", "grade": 91, "house: "..."" }
            ],
            "message": `You are now summoning all the failing students in the ${req.params["className"]} class.`,
            "timestamp": req.timestamp
        });
    } catch(error) {
        res.json({
            "error": `Failing students could not be summonded from the ${req.params["className"]} class.`,
            "timestamp": req.timestamp
        });
    };
});

app.listen(port, () => {
    console.log("App is listening on port", port);
  });
  








  