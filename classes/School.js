const Class = require('./Class');
const Student = require('./Student')

class School {
  constructor() {
    this.classes = {
      // className: Class Object
      //   physics: {} 
    }
  }

  addClass = (name, teacher) => {
    let newClass = new Class(name, teacher);
    if(this.classes[name.toLowerCase()]) {
      return false
    }
    this.classes[name.toLowerCase()] = newClass;
    return newClass;
  }

  enrollStudent = (className, student) => {
    // Check if student is missing information
    if(!student.name || !student.age || !student.city || !student.grade) {
      return false;
    }

    // Creating helper variable, and new student based on inputted info
    let currClass = this.classes[className.toLowerCase()];
    let newStudent = new Student(student.name, student.age, student.city, student.grade);

    // Checking if student is enrolled, and updating if so
    // Else it will enroll the student
    if(currClass.isEnrolled(newStudent.name)) {
      currClass.updateStudent(newStudent);
    } else {
      currClass.enrollStudent(newStudent);
    }

    return newStudent;
  }

  getStudentsByClass = (className) => {
    return this.classes[className.toLowerCase()].students;
  }

  getStudentsByClassWithFilter = (className, failing = false, city = undefined) => {
    return this.getStudentsByClass(className).filter(student => {
      // Gives back a filtered array of students who are failing, and from given city
        if(failing && city) {
          return (student.isFailing() && student.matchCity(city));
        } else if(city) {
          return student.matchCity(city);
        } else if(failing) {
          return student.isFailing();
        }
      })
  }
}

module.exports = School;
