class Class {
  constructor(name, teacher) {
    this.name = name
    this.teacher = teacher
    this.students = []
  }

  addStudents(student){
    this.students.push(student)

  }
  
}






module.exports = Class;
