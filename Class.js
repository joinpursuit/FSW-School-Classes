class Class {
  constructor(name, teacher) {
    this.name = name
    this.teacher = teacher
    this.students = []
  }

  addStudent = student => {
    this.students.push(student)
    return this.students
  }
  
}
module.exports = Class
