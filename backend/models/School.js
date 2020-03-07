const Class = require("./Class.js");
const Student = require("./Student");

class School {
  constructor() {
    this.schoolData = {
      // german: { name: "german", teacher: "Jon" , students: [{name: "wil", city: "las vegas", age: "32", grade: 67}]}
    
    };
  }
  addClass(name, teacher) {
    let newClass = new Class(name, teacher);
    this.schoolData[name] = newClass;
  }
  enrollStudent(className, student) {
    const { name, age, city, grade } = student;
    let newStudent = new Student(name, age, city, grade);
    this.schoolData[className].students.push(newStudent);
  }
  getStudentsByClass(className) {
    return this.schoolData[className].students;
  }

  getStudentsByClassWithFilter(className, failing, city) {
    let studentsList = this.schoolData[className].students;
    if (failing && city) {
      return studentsList.filter(
        student => student["grade"] < 70 && student["city"] === city
      );
    } else if (failing) {
      return studentsList.filter(student => student["grade"] < 70);
    } else if (city) {
      return studentsList.filter(student => student["city"] === city);
    }
  }
}

module.exports = School;
