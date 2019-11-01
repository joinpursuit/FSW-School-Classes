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
// const validObj = {
//   name: true,
//   teacher: true
// };
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

/* MIDDLEWARE */
const screenInputs = (req, res, next) => {
  let problems = [];
  // completeness checks
  if (!(req.body.className && req.body.teacherName)) {
    problems.push("incomplete submission");
  }
  // individual checks
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

const verifyExists = (req, res, next) => {
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


/* ROUTES */
router.post("/", screenInputs, antiDupe, makeNewClass);
router.post("/:className/enroll", verifyExists, screenInputs);


module.exports = router;
