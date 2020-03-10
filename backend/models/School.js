const Class = require("./Class.js");
const Student = require("./Student");

class School {
  constructor() {
    this.schoolData = {
      german: {
        name: "german",
        teacher: "Jon",
        students: [{ name: "mike", city: "new york", age: "32", grade: 67 }, {
          name: "goliath", city: "new york", age: 23, grade: 85}, { name: "rose", city: "new york", age: 46, grade: 90
        },]
      }
    };
  }

  addClass(name, teacher) {
    let newClass = new Class(name, teacher);
    this.schoolData[name] = newClass;
    return newClass;
  }

  enrollStudent(className, student) {
    const { name, grade, city, age } = student;
    // const name = student.name; // this is the same as above. 
    // const age = student.age
    if (name && city && age && grade) {
      let newStudent = new Student(name, age, city, grade);
      this.schoolData[className].students.push(newStudent);
      console.log(this.schoolData[className].students);
      return newStudent;
    } else {
      throw Error;
    }
  }

  getStudentsByClass(className) {
    return this.schoolData[className].students;
  }

  getStudentsByClassWithFilter(className, failing, city) {

    // const { className } = req.params;
    // const { failing, city } = req.query;

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
