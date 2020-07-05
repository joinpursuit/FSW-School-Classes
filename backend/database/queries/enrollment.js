const db = require("../db"); //connected db instance

//query to add a new student in the database
const enrollClass = async (studentObj, classname, timeStamp) => {
  let insertQuery = `INSERT INTO students(classname,studentName,age,city,grade,timeStamp) 
        VALUES($/classname/,$/studentName/,$/age/,$/city/,$/grade/,$/timeStamp/) RETURNING * `;

  return await db.one(insertQuery, {
    classname,
    studentName: studentObj.studentName,
    age: studentObj.age,
    city: studentObj.city,
    grade: studentObj.grade,
    timeStamp,
  });
};

module.exports = {
  enrollClass,
};
