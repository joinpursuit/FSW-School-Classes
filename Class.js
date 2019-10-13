class Class {
  constructor(name, teacher) {
    this.name = name
    this.teacher = teacher
    this.students = []
  }

  enrollStudent(student){
  	this.students.push(student);
  }
}



module.exports = Class;
