const Class = require('./Class')
const Student = require('./Student')

class School {
  constructor() {
    this.classes = {}
  }
  addClass(name, teacher) {
    let newClass = new Class(name, teacher)
    this.classes[name] = newClass
  }
  enrollStudent(className, student) {
    let newStudent = new Student(student.name, student.city, student.age, student.grade)
    let studentsArray = this.classes[className].students
    for (let i = 0; i < studentsArray.length; i ++){
      if (studentsArray[i] === newStudent) {
        studentsArray.splice(i)
      }
    }
    studentsArray.push(student)
    this.classes[className].students = studentsArray
  }
  getStudentsByClass(className) {
    return this.classes[className].students
  }
  getStudentsByClassWithFilter(className) {
    let studentsArray = this.classes[className].students
    let failingArray = []
    for (let a of studentsArray) {
      let grade = parseInt(a.grade, 10)
      if (grade < 70) {
        failingArray.push(a)
      }
    }
    return failingArray
  }
}

module.exports = School
