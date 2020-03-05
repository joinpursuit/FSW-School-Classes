const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const timestamp = require("express-timestamp");
const School = require("./School.js");
const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(timestamp.init);



const School = require("../models/School");
const Student = require("../models/Student");



let mySchool = new School();
mySchool.addClass("Transfigurations", "Ms. Minerva McGonagall"),
mySchool.addClass("Potions", "Mr. Severus Snape"),
mySchool.addClass("Defense Against The Dark Arts", "Mr. Remus Lupin");
mySchool.addClass("Herbology", "Ms. Pomona Sprout");
mySchool.addClass("Charms", "Mr. Filius Flitwick");

mySchool.enrollStudent("Transfigurations", {name: "Harry Potter", age: 22, city: "Godric Hallows", grade: 86.5, house: "Gryffindor"})
mySchool.enrollStudent("Transfigurations", {name: "Penelope Clearwater", age: 23, city: "Oxford", grade: 79.0, house: "Ravenclaw"})
mySchool.enrollStudent("Transfigurations", {name: "Ronald Weasley", age: 22, city: "Newcastle", grade: 88.5, house: "Gryffindor"})
mySchool.enrollStudent("Transfigurations", {name: "Susan Bones", age: 23, city: "London", grade: 89.0, house: "Hufflepuff"})


mySchool.enrollStudent("Potions", {name: "Itoro Uko", age: 25, city: "Houston", grade: 98.1, house: "Gryffindor"})
mySchool.enrollStudent("Potions", {name: "Gregory Goyle", age: 24, city: "Cambridge", grade: 61.3, house: "Slytherin"})
mySchool.enrollStudent("Potions", {name: "Lisa Turpin", age: 23, city: "Bristol", grade: 90.2, house: "Ravenclaw"})


mySchool.enrollStudent("Defense Against The Dark Arts", {name: "Justin Finch-Fletchley", age: 23, city: "Croydon", grade: 68.5, house: "Hufflepuff"})
mySchool.enrollStudent("Defense Against The Dark Arts", {name: "Chidera Manke", age: 23, city: "Nottingham", grade: 88.5, house: "Gryffindor"})
mySchool.enrollStudent("Defense Against The Dark Arts", {name: "Hermione Granger", age: 22, city: "Liverpool", grade: 97.9, house: "Gryffindor"})
mySchool.enrollStudent("Defense Against The Dark Arts", {name: "Padma Patil", age: 23, city: "Exeter", grade: 81.7, house: "Ravenclaw"})


mySchool.enrollStudent("Herbology", {name: "Luna Lovegood", age: 22, city: "Wembley", grade: 80.0, house: "Ravenclaw"})
mySchool.enrollStudent("Herbology", {name: "Draco Malfoy", age: 22, city: "Winchester", grade: 64.0, house: "Slytherin"})
mySchool.enrollStudent("Herbology", {name: "Hannah Abbott", age: 23, city: "Wembley", grade: 61.9, house: "Hufflepuff"})


mySchool.enrollStudent("Charms", {name: "Millicent Bulstrode", age: 23, city: "Birmingham", grade: 81.0, house: "Slytherin"})
mySchool.enrollStudent("Charms", {name: "Terry Boot", age: 24, city: "Manchester", grade: 65.1, house: "Ravenclaw"})
mySchool.enrollStudent("Charms", {name: "Zacharias Smith", age: 23, city: "Chester", grade: 86.5, house: "Gryffindor"})



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
app.get("/class/:className/", (req, res) => {
  if(mySchool.classes[req.params.className]) {
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
app.post("/class/:className/enroll", (req, res) => {
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
app.get("/class/:className/students/", (req, res) => {
  const { className } = req.params
  const { failing, city } = req.query;
  const helloSchool = mySchool.classes[className];
    if(!helloSchool) {
      res.json({
        error: "My apologies but this class does not exist. Please speak to Dumbledor.",
        timestamp: req.timestamp
      });
    } else if (failing || city) {
      let failedStudents = mySchool.getStudentsByClassWithFilter(
        className,
        failing,
        city
      );
      res.json({
        students: failedStudents,
        message: `You are now summoning all the failing students in this class.`,
        timestamp: req.timestamp
      });
    } else {
      let allStu = mySchool.getStudentsByClass(className);
      res.json({
        students: allStu,
        message: `There are no failing students in this class but you are welcomed to view it yourself.`,
        // Name: ${name} Age: ${age} City: ${city} Grade: ${grade} House: ${house}
        timestamp: req.timestamp

      })
    }

  })
  

app.listen(port, () => {
    console.log("App is listening on port", port);
  });
  








  