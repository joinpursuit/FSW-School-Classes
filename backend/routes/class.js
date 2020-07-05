const express = require("express");
const router = express();
const { addClassMethod, emptyClassData } = require("../database/queries/class");

const timeStamp = () => new Date().toLocaleString();

//query to add a new class to the database
const addClass = async (req, res, next) => {
  const classname = req.body.className;
  const teacher = req.body.teacher;
  console.log(classname);

  try {
    let newClass = await addClassMethod(classname, teacher);

    res.status(200).json({
      payload: newClass,
      message: "Created a new class",
      status: "success",
      error: false,
    });
  } catch (err) {
    console.log(err);
    res.send({
      message: "Class already exist. Please enter a different one.",
      error: true,
      timeStamp: timeStamp(),
    });
  }
};

router.post("/post", addClass);

module.exports = router;
