const db = require("../db"); //connected db instance

//query to database to get student and check if student is failing or not
const getStudentsByClass = async (classname, failing) => {
  failing === "false"
    ? (getQuery = "SELECT * FROM students WHERE className = $/classname/")
    : (getQuery =
        "SELECT * FROM students WHERE className = $/classname/ AND grade <= 65");

  return await db.any(getQuery, {
    classname,
  });
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

module.exports = {
  getStudentsByClass,
  validateClassQuery,
  sendFilterResults,
};
