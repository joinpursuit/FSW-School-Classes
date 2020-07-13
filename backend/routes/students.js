const express = require("express");
const router = express();
const { getStudentsByClass } = require("../database/queries/students");

//query to database to get student and check if student is failing or not
const getStudents = async (req, res, next) => {
  let classname = req.params.classname;
  try {
    let student = await getStudentsByClass(
      req.params.classname,
      req.query.failing
    );

    if (!student.length) {
      res.send({ message: "yolo", status: "failure", error: true });
    }

    res.status(200).json({
      payload: student,
      classname: classname,
      message: "Retrieved Students",
      status: "success",
      error: false,
    });
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
// const validateClassQuery = (req, res, next) => {
//   let classname = req.params.classname;

//     const data = req.data
//   if (req.data.length === 0) {
//     res.json({
//       status: "failed",
//       error: true,
//       message: `${classname} is empty please enroll students`,
//       timeStamp: timeStamp(),
//     });
//   }
// };

router.get("/:classname/information", getStudents);

module.exports = router;
