const express = require("express");
const router = express();
const { db } = require("../database/db"); //connected db instance

//function create a timestamp
const timeStamp = () => new Date().toLocaleString();

//query to add a new class to the database
const addClassMethod = async (req, res, next) => {
  const classname = req.body.className;
  const teacher = req.body.teacher;
  try {
    let insertQuery = `INSERT INTO class(classname,teacher,timeStamp) VALUES($/classname/,$/teacher/,$/timeStamp/) RETURNING *`;
    req.returnQuery = await db.one(insertQuery, {
      classname,
      teacher,
      timeStamp,
    });
    next();
  } catch (err) {
    // Class already created
    if (err.code === "23505" && err.detail.includes("already exists")) {
      let customErr = "Class already exist. Please enter a different one.";
      err = customErr;
      res.send({
        message: err,
        error: true,
        timeStamp: timeStamp(),
      });
    }
    throw err;
  }
};
//checks to see if all the information for the classis filled out
const emptyClassData = (req, res, next) => {
  let classname = req.body.className;
  let teacher = req.body.teacher;
  classname === "" || teacher === ""
    ? res.status(400).send({
        message: "Please fill out all of the class information",
        error: true,
      })
    : next();
};
//sends class creation information
const sendClassResults = (req, res) => {
  let data = req.returnQuery;
  res.status(200).json({
    payload: data,
    message: "Created a new class",
    status: "success",
    error: false,
  });
};

router.post("/post", addClassMethod, emptyClassData, sendClassResults);

//query to add a new student in the database
const enrollClass = async (req, res, next) => {
  let classname = req.params.classname;
  let studentName = req.body.studentName;
  let age = req.body.age;
  let city = req.body.city;
  let grade = req.body.grade;

  try {
    let insertQuery = `INSERT INTO students(classname,studentName,age,city,grade,timeStamp) 
        VALUES($/classname/,$/studentName/,$/age/,$/city/,$/grade/,$/timeStamp/) RETURNING * `;
    req.studentInsertQuery = await db.one(insertQuery, {
      classname,
      studentName,
      age,
      city,
      grade,
      timeStamp,
    });
    next();
  } catch (err) {
    // Student already created
    if (err.code === "23505" && err.detail.includes("already exists")) {
      let customErr =
        "Student is already enrolled. Please try a different one.";
      err = customErr;
      res.send({
        message: err,
        error: true,
        payload: null,
        timestamp: timeStamp(),
      });
    }
    throw err;
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

// const failingStudent = (req, res) => {
//   let grade = req.body.grade;

//   if (grade <= 65) {
//     db.none('UPDATE student SET failing = tru')
//   }
// }

//sends the student enrollment data
const sendStudentResults = (req, res) => {
  let data = req.studentInsertQuery;
  res.status(200).json({
    //    studentID:classname,
    message: "Enrolled Student",
    payload: data,
    status: "success",
    error: false,
  });
};

//query to database to get student and check if student is failing or not
const getStudentsByClass = async (req, res, next) => {
  let classname = req.params.classname;
  // let city = req.query.city;
  let failing = req.query.failing;
  console.log("failing", typeof failing);
  failing === "false"
    ? (getQuery = "SELECT * FROM students WHERE className = $/classname/")
    : (getQuery =
        "SELECT * FROM students WHERE className = $/classname/ AND grade <= 65");

  try {
    req.query = await db.any(getQuery, {
      classname,
    });
    next();
    // return geuery
  } catch (err) {
    if (err instanceof errors.QueryResultError) {
      if (err.code === errors.queryResultErrorCode.noData) {
        return false;
      }
    }
    throw err;
  }
};

//validates if class contains any students
const validateClassQuery = (req, res, next) => {
  let classname = req.params.classname;
  let data = req.query;
  // console.log(data);

  if (data.length === 0) {
    res.json({
      status: "failed",
      error: true,
      message: `${classname} is empty please enroll students`,
      timeStamp: timeStamp(),
    });
  } else {
    next();
  }
};

//middleware to send filter results
const sendFilterResults = (req, res) => {
  let classname = req.params.classname;
  let data = req.query;
  res.status(200).json({
    payload: data,
    classname: classname,
    message: "Retrieved Students",
    status: "success",
    error: false,
  });
};

//router endpoints
router.post(
  "/:classname/enroll",
  invalidStudent,
  enrollClass,
  sendStudentResults
);

router.get(
  "/:classname/students",
  getStudentsByClass,
  validateClassQuery,
  sendFilterResults
);

module.exports = router;
