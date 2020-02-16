const Class = require("./Class");
const Student = require("./Student");

class School {
  constructor() {
    this.classes = {
      physics: {
        name: "physics",
        teacher: "Jon A",
        students: [
          { name: "slater", age: 14, city: "Brooklyn", grade: 35 },
          {
            name: "zach",
            age: 14,
            city: "Brooklyn",
            grade: 98
          },
          {
            name: "screech",
            age: 14,
            city: "Queens",
            grade: 45
          },
          {
            name: "lisa",
            age: 14,
            city: "Queens",
            grade: 98
          },
          {
            name: "jessy",
            age: 14,
            city: "Queens",
            grade: 69
          }
        ]
      },
      english: { name: "english", teacher: "lee", students: [] }
    };
  }
  addClassToClasses(name, teacher) {
    this.addClass(name, teacher);
    return this.classes[name];
  }
  addClass(name, teacher) {
    let newClass = new Class(name, teacher);
    this.classes[name] = newClass;
    return this.classes[name];
  }

  enrollStudent(className, student, age, city) {
    let studentsarr = this.classes[className].students;
    let newStudent = new Student(student, age, city, "N/A");
    studentsarr.push(newStudent);
    return newStudent;
  }

  getStudentsByClass(className) {
    return this.classes[className].students;
  }

  getStudentsByClassWithFilter(className, failing, city) {
    let studentsArr = this.classes[className].students;

    return studentsArr.filter(student => {
      if (failing && student.grade < 70 && student.city === city) {
        return student;
      } else if (failing === undefined && student.city === city) {
        return student;
      } else if (failing && student.grade < 70 && city === undefined) {
        return student;
      }
    });
  }
}

let mySchool = new School();

// console.log(mySchool.getStudentsByClassWithFilter("physics",false,"Queens"));
// console.log(mySchool.classes.physics);

module.exports = mySchool;
