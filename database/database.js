/*
Joseph P. Pasaoa
Database | Express Server Project
*/


/* DATA MAIN */
const School = require('../server/models/school.js');
const Class = require('../server/models/class.js');
const joeySchool = new School;


/* data injection */
const tempData = [
  ["Physics", "Mr. Michael Jones", "2019, 09/28 13:52:00"],
  ["Computer Science", "Ms. Lynnette Herrebre", "2019, 09/30 12:34:01"],
  ["Math 101", "Mr. Farsu Pryn", "2019, 10/01 09:55:00"],
  ["Math 201", "Mrs. Wilhemina Pinke", "2019, 10/01 14:13:40"],
  ["101 Engineering", "Mr. Alysius Retcognac", "2019, 10/21 08:32:41"]
];
for (let entry of tempData) {
  joeySchool.addClass(entry[0], entry[1]);
  joeySchool.classes[entry[0].toLowerCase()].timeCreated = entry[2];
}


module.exports = joeySchool;
