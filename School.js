const Class = require('./Class');
const Student = require('./Student')

class School {
  constructor() {
    this.classes = {
    }
  }

  addClass(name, teacher) {
    let newClass = new Class(name, teacher);
    this.classes[name] = newClass;
  }


  enrollStudent(className, student) {
    let newStudent = new Student(student.name, student.age, student.city, student.grade)
    this.class[className]["student"].push(newStudent)
  }


  getStudentsByClass(className) {
    return this.classes[className].students
  }




  
  getStudentsByClassWithFilter(className, failing, city) {
    let students = this
  }

}

module.exports = School;
