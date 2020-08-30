const express = require("express");
const router = express();
const { enrollClass } = require("../database/queries/enrollment");

const timeStamp = () => new Date().toLocaleString();
//query to add a new student in the database
const enroll = async (req, res, next) => {
  try {
    let bodyCopy = Object.assign({}, req.body);
    bodyCopy.className = req.params.className;
    bodyCopy.timeStamp = timeStamp();

    let newStudent = await enrollClass(bodyCopy);

    res.status(200).json({
      message: "Enrolled Student",
      payload: newStudent,
      status: "success",
      error: false,
    });
  } catch (err) {
    console.log(err);
    res.send({
      message: "Failed to enroll student",
      error: true,
      payload: null,
      timestamp: timeStamp(),
    });
  }
};

//checks to see if all the information for the student is filled out
const invalidStudent = (req, res, next) => {
  let studentName = req.body.studentName;
  let age = req.body.age;
  let city = req.body.city;
  let grade = req.body.grade;

  studentName === "" || age === "" || grade === "" || city === ""
    ? res.status(400).send({
        errMessage: "Please fill out all the information for the student",
        error: true,
        timeStamp: timeStamp(),
      })
    : next();
};

router.post("/:className/enroll", invalidStudent, enroll);

module.exports = router;
