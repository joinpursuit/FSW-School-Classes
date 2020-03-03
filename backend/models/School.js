const Class = require("./Class.js");
const Student = require("./Student");

class School {
  constructor() {
    this.schoolData = {
        class: "spanish",
        teacher: "grumberG"
    };
  }
  addClass(name, teacher) {
    let newClass = new Class(name, teacher);
    this.schoolData[name] = newClass;
  }
  enrollStudent(className, student) {
    this.classes[className].students.push(student);
  }
  getStudentsByClass(className) {
    // Your code here
  }

  getStudentsByClassWithFilter(className, failing, city) {
    // Your code here
  }
}

module.exports = School;
