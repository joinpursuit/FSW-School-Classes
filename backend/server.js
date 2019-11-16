const express = require("express");
const cors = require("cors");
const School = require("./school");
const Student = require("./student")

const app = express();
const port = 3000;

const PS95 = new School();

app.use(cors());
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());

app.post("/class", (req, res) => {
  // let name  = req.body.name
  // let teacher = req.body.teacher
  const { name, teacher } = req.body;
  try {
    if (!name || !teacher) {
      throw new Error(
        "Please fill out all the information or Class already exists"
      );
    }
    let newClass = PS95.addClass(name, teacher);

    res.json({
      message: "Created a new class",
      class: newClass,
      timestamp: new Date()
    });
  } catch (error) {
    res.json({
      message: error.message,
      timestamp: new Date()
    });
  }
});

app.post('/class/:className/enroll', (req, res) => {
    const {name, age, city, grade} = req.body;
    const {className} = req.params;
    let newStudent = new Student(name, age, city, grade)
    const newStudents = PS95.enrollStudent(className, newStudent)
    res.json ({
        message: "Enrolled Student",
        student: newStudent,
        timestamp: new Date()
    })
})


app.use((req, res) => {
  res.json({
    message: "route not found"
  });
});






app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
