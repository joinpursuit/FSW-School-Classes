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
// mySchool.enrollStudent("Defense Against the Dark Arts", {name: "Harry Potter", age: 22, city: "Godric Hallows", grade: 86.5})


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
        message: "That class can not be created at this time. Try again or speak to Dumbledor.",
        timestamp: req.timestamp
      });
    }
  });

//Displaying a class with all it's students 
app.get("/class/:className", (req, res) => {
  if (mySchool.classes[req.params.className]) {
    let allStudents = mySchool.classes[req.params.className].students;
    // console.log('allStudents', allStudents)
    res.json({
      allStudents: allStudents,
      "message": "Retrieved all students in this class",
      "timestamp": req.timestamp
    })
  } else {
    res.json({
      "message": "This class does not exist",
      "timestamp": req.timestamp
    })
  }


 // try catch will be used when you want to return a promise,
  // if not, you can use a conditional 
  
    // try{
    //   let allStudents = mySchool.classes[req.params.className].students;
    //   console.log(allStudents)
    //   res.json({
    //     allStudents: allStudents,
    //     "message": "Retrieved all students in this class",
    //     "timestamp": req.timestamp
    //   })
    // } catch (error) {
    //   console.log(error)
    //   res.json({
    //     "message": "Could not recieve any students from this class",
    //     "timestamp": req.timestamp
    //   })
    // }
})


// Enrolling a new student
app.post("/class/:className/enroll", (req, res) => {
    try {
        mySchool.enrollStudent(req.params.className, req.body);
        console.log('in enroll student req.body',req.body)
        res.json({
                "student": { "name": req.body.name, "age": req.body.age, "city": req.body.city, "grade": req.body.grade },
                "className": req.params["className"],
                "message": `${req.body.age} year old ${req.body.name} from ${req.body.city}is now enrolled in the ${req.params.className} class with a GPA of ${req.body.grade}.`,
                timestamp: req.timestamp
        });
    } catch(err) {
      console.log(err)
        res.json({
            "message":`${req.body.age} year old ${req.body.name} with a GPA of ${req.body.grade} from ${req.body.city} CAN NOT be enrolled in the ${req.body.class} class.`,
            timestamp: req.timestamp
        })
    }
});

// Getting students that failed
app.get("/class/:className/students", (req, res) => {
    try {
        if(mySchool.getStudentsByClassWithFilter([req.params.className], req.body.name, req.body.failing, req.body.city));
        res.json({
            "students": [{ "name": req.body.name, "age": req.body.age, "city": req.body.city, "grade": req.body.grade },
            // { "name": "Ron Weasley", "age": 23, "city": "Manchester", "grade": 91 }
            ],
            "message": "Displaying all failing students in Hogwarts",
            "timestamp": req.timestamp
        });
    } catch(error) {
        res.json({
            "error": `Class ${req.body.class} doesn't exist.`,
            "timestamp": req.timestamp
        });
    };
});

app.listen(port, () => {
    console.log("App is listening on port", port);
  });
  








  