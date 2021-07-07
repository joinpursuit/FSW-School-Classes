const Class = require('./Class.js');
const Student = require('./Student.js')

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
    this.classes[className].students.push(student)
  }
}

module.exports = School;
