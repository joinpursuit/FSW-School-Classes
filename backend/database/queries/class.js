const db = require("../db"); //connected db instance

//query to add a new class to the database
const addClassMethod = async (classname, teacher) => {
  //function create a timestamp
  const timeStamp = () => new Date().toLocaleString();

  let insertQuery = `INSERT INTO class(classname,teacher,timeStamp)
     VALUES($/classname/,$/teacher/,$/timeStamp/) RETURNING *`;

  return await db.one(insertQuery, {
    classname,
    teacher,
    timeStamp,
  });
};
//checks to see if all the information for the classis filled out
const emptyClassData = (classname, teacher) => {
  classname === "" || teacher === ""
    ? res.status(400).send({
        message: "Please fill out all of the class information",
        error: true,
      })
    : next();
};

module.exports = {
  addClassMethod,
  emptyClassData,
};
