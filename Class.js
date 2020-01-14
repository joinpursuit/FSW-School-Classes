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



// let classA = new Class("Code","Danny");
// classA.addStudents("bruhman");
// console.log(classA);


module.exports = Class;
