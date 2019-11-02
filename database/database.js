/*
Joseph P. Pasaoa
Database | Express Server Project
*/


/* DATA MAIN */
const School = require('../server/models/school.js');
const Class = require('../server/models/class.js');
const joeySchool = new School;


/* data injection */
const tempClassesData = [
  ["Physics", "Mr. Michael Jones", "2019, 09/28 13:52:00"],
  ["Computer Science", "Ms. Lynnette Herrebre", "2019, 09/30 12:34:01"],
  ["Math 101", "Mr. Farsu Pryn", "2019, 10/01 09:55:00"],
  ["Math 201", "Mrs. Wilhemina Pinke", "2019, 10/01 14:13:40"],
  ["101 Engineering", "Mr. Alysius Retcognac", "2019, 10/21 08:32:41"]
];
const tempStudentsData = [
  ["Daenerys Targaryen", 27, "New York City", 34, "999-99-9990"],
  ["Jon Snow", 25, "Montreal", 83, "898-89-8887"],
  ["Arya Stark", 18, "montreal", 79, "123-45-6789"],
  ["Sansa Stark", 22, "montreal", 85, "987-65-4321"],
  ["Theon Greyjoy", 26, "new york City", 66, "000-00-0555"]
];
for (let entry of tempClassesData) {
  joeySchool.addClass(entry[0], entry[1]);
  joeySchool.classes[entry[0].toLowerCase()].timeCreated = entry[2];
}
for (let person of tempStudentsData) {
  joeySchool.addStudentToClass("physics", person[4], person[0], person[1], person[2], person[3]);
}


module.exports = joeySchool;
