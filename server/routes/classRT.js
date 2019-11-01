/*
Joseph P. Pasaoa
class Route | Express Server Project
*/


/* HELPERS */
const log = console.log;


/* DATABASE ACCESS */
const g = require("../../database/database.js");


/* ROUTER INIT */
const express = require('express');
  const router = express.Router();
  router.use(express.json()); // for Raw and Postman
  router.use(express.urlencoded({extended: false}));


/* HELPERS */
const addZero = (component, targetLength) => {
  while (component.toString().length < targetLength) {
    component = "0" + component;
  }
  return component;
}
const customizeDate = (d) => {
  let output = `${addZero(d.getFullYear(), 4)}, ${addZero(d.getMonth() + 1, 2)}/${addZero(d.getDate(), 2)}`;
  output += ` ${addZero(d.getHours(), 2)}:${addZero(d.getMinutes(), 2)}:${addZero(d.getSeconds(), 2)}`;
  return output;
}
const validateSSN = (input) => {
  const ssnPattern = /^[0-9]{3}\-?[0-9]{2}\-?[0-9]{4}$/;
  return ssnPattern.test(input);
}


/* MIDDLEWARE */
const isInputComplete = (req, res, next) => {
  const classPostError = (!req.params.op && (!req.body.className || !req.body.teacherName));
  const studentPostError = (!!req.params.op && (!req.body.name || !req.body.age || !req.body.ssn || !req.body.city || !req.body.grade));
  if (classPostError || studentPostError) {
    res.json({
        status: "FAIL",
        message: `Error: INCOMPLETE SUBMISSION. Please check all inputs are filled and re-submit.`,
        timestamp: customizeDate(new Date())
    });
  } else {
    next();
  }
};

const screenInputs = (req, res, next) => {
  let problems = [];
  for (let key in req.body) {
    const str = req.body[key].trim();
    switch (key) {
      case "className":
        if (!str || str.length > 32) {
          problems.push("class name is missing or too long (32 chars max)");
        }
        break;
      case "teacherName":
        if (!str || str.length > 32) {
          problems.push("teacher name is missing or too long (32 chars max)");
        }
        break;
      case "studentName":
        if (!str || str.length > 32) {
          problems.push("student name is missing or too long (32 chars max)");
        }
        break;
      case "age":
        if (!str || isNaN(parseInt(str)) || parseInt(str) < 3 || parseInt(str) > 120) {
          problems.push("age entry is invalid");
        }
        break;
      case "city":
        if (!str || str.length > 32) {
          problems.push("city is missing or too long (32 chars max)");
        }
        break;
      case "grade":
        if (!str || isNaN(parseFloat(str)) || parseFloat(str) < 0 || parseFloat(str) > 100) {
          problems.push("grade entry is invalid");
        }
        break;
      case "ssn":
        if (!str || !validateSSN(str)) {
          problems.push("invalid or missing ssn");
        }
        break;
      default:
        break;
    }
  }
  if (problems[0]) {
    problems = problems.map(el => el.toUpperCase());
    if (problems.length > 1) {
      problems[length - 1] = "and " + problems[length - 1];
    }
    problems.length > 2
      ? problems = problems.join(', ')
      : problems = problems.join(' ');
    res.json({
        status: "FAIL",
        message: `Error: ${problems}. Please check your inputs and re-submit.`,
        timestamp: customizeDate(new Date())
    });
  } else {
    next();
  }
};

const antiDupe = (req, res, next) => {
  if (g.classes[req.body.className.toLowerCase()]) {
    res.json({
        status: "FAIL",
        message: "Error: Submitted class already exists. Please change entry and try again.",
        submission: req.body,
        timestamp: customizeDate(new Date())
    });
  } else {
    next();
  }
};

const doesClassExist = (req, res, next) => {
  if (!g.classes[req.params.className]) {
    res.json({
        status: "FAIL",
        message: `Error: Target class \'${req.params.className}\' not found. Please check the input and re-submit.`,
        timestamp: customizeDate(new Date())
    });
  } else {
    next();
  }
};

const makeNewClass = (req, res, next) => {
  const newClass = g.addClass(req.body.className, req.body.teacherName);
  res.json({
      status: "SUCCESS",
      message: `The submitted class \'${req.body.className}\' has been added.`,
      submission: newClass
  });
};

const addOrUpdateStudent = (req, res, next) => {
  const classStr = req.params.className.toLowerCase();
  const studentStr = (req.body.ssn).toString();
  if (g.classes[classStr].index[studentStr]) { // student ALREADY ENROLLED, server will UPDATE record
    const updatedRecord = g.updateStudentInClass(classStr, studentStr, req.body.name, req.body.age, req.body.city, req.body.grade);
    res.json({
        status: "SUCCESS",
        message: `The record of student \'${req.body.name.trim()}\' has been updated.`,
        submission: updatedRecord
    });
  } else if (g.classes[classStr].capacity <= 0) { // NEW ENROLLMENT but CLASS is FULL
    res.json({
        status: "FAIL",
        message: `Error: the class \'${classStr}\' is full.`,
        timestamp: customizeDate(new Date())
    });
  } else { // NEW ENROLLMENT is a GO
    const newEnroll = g.addStudentToClass(classStr, studentStr, req.body.name, req.body.age, req.body.city, req.body.grade);
    res.json({
        status: "SUCCESS",
        message: `The submitted student \'${req.body.name.trim()}\' has been enrolled into \'${req.params.className}\' successfully.`,
        submission: newEnroll
    });
  }
}


/* ROUTES */
router.post("/", isInputComplete, screenInputs, antiDupe, makeNewClass); // for adding a class
router.post("/:className/:op", doesClassExist, isInputComplete, screenInputs, addOrUpdateStudent); // for adding a student to a class


module.exports = router;
