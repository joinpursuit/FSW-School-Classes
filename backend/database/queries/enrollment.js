const db = require("../db"); //connected db instance

//query to add a new student in the database
const enrollClass = async (studentObj) => {
  let insertQuery = `INSERT INTO students(className,studentName,age,city,grade,timeStamp) 
        VALUES($/className/,$/studentName/,$/age/,$/city/,$/grade/,$/timeStamp/) RETURNING * `;

  return await db.one(insertQuery, {
    ...studentObj,
  });
};

module.exports = {
  enrollClass,
};
