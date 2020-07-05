const express = require("express");
const router = express();
const { enrollClass } = require("../database/queries/enrollment");

const timeStamp = () => new Date().toLocaleString();

//query to add a new student in the database
const enroll = async (req, res, next) => {
  try {
    let newStudent = await enrollClass(
      req.body,
      req.params.classname,
      timestamp()
    );

    res.status(200).json({
      //    studentID:classname,
      message: "Enrolled Student",
      payload: newStudent,
      status: "success",
      error: false,
    });
  } catch (err) {
    // Student already created
    res.send({
      message: "Student is already enrolled. Please try a different one.",
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

router.post("/:classname/enroll", invalidStudent, enroll);

module.exports = router;
