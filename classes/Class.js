class Class {
  constructor(name, teacher) {
    this.name = name;
    this.teacher = teacher;
    this.students = [];
  }

  enrollStudent(student) {
    this.students.push(student);
  }

  isEnrolled(studentName) {
    for(let i = 0; i < this.students.length; i++) {
      let student = this.students[i];
      if(student.name === studentName) return true;
    }
    return false;
  }

  updateStudent(newStudent) {
    this.students.forEach(student => {
      if(student.name === newStudent.name) student = newStudent;
    })
  }
}

module.exports = Class;
