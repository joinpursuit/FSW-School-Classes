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
    if(this.classes[name]) {
      return false
    }
    this.classes[name] = newClass;
    return newClass;
  }

  enrollStudent = (className, student) => {
    // Check if student is missing information
    if(!student.name || !student.age || !student.city || !student.grade) {
      return false;
    }

    // Creating helper variable, and new student based on inputted info
    let currClass = this.classes[className];
    let newStudent = new Student(student.name, student.age, student.city, student.grade);

    // Checking if student is enrolled, and updating if so
    // Else it will enroll the student
    if(currClass.isEnrolled(newStudent.name)) {
      currClass.updateStudent(newStudent);
    } else {
      this.classes[className].enrollStudent(newStudent);
    }

    return newStudent;
  }

  getStudentsByClass = (className) => {
    return this.classes[className].students;
  }

  getStudentsByClassWithFilter = (className, failing = false, city = undefined) => {
    if(failing && city) {
      // Gives back a filtered array of students who are failing, and from given city
      return this.getStudentsByClass(className).filter(student => (student.isFailing() && student.matchCity(city)));
    }

    if(!failing && city) {
      // Gives back a filtered array of students from given city
      return this.getStudentsByClass(className).filter(student => student.matchCity(city));
    }

    if(failing && !city) {
      // Gives back a filtered array of students who are failing
      return this.getStudentsByClass(className).filter(student => student.isFailing());
    }
  }
}

module.exports = School;
