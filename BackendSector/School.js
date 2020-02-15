const Class = require('./Class');
const Student = require('./Student')

class School {
  constructor() {
    this.classes = {
      // className: Class Object
      //  
    }
  }
  addClass(name, teacher) {
    let newClass = new Class(name, teacher);
    if(this.classes[name]){
        throw {Status:500, Message: "Class already exists at NRES"}
      }
    this.classes[name] = newClass;
    return newClass
  }
  enrollStudent(student) {
    let newStudent = new Student(student.name, student.age, student.city, student.grade);
    if(this.classes[student.class]["students"].includes(student.name)){
      throw {Status:500, Message: "Student has already been enrolled for indoctrination"}
    }
    this.classes[student.class]["students"].push(newStudent);
    return newStudent
  } 
  // getStudentsByClass(className) {
  //   return this.classes[className]["students"]
  // }
  getStudentsByClassWithFilter(className, city, fail) {
    let studentFilter = [];
    let schoolClass = this.classes[className]["students"]
      if(fail === true && city !== null){
        for (let student of schoolClass){
          if(student["grade"] < 70 && student["city"] === city){
            studentFilter.push(student);
          }
        }
      } else if(fail === false && city !== null){
        for (let student of schoolClass){
          if(student["city"] === city){
            studentFilter.push(student)
          }
        }
      } else if(fail === true & city === null){
          if(student["grade"] < 70){
            studentFilter.push(student)
          }
      } else if(fail === false && city === null) {
          return schoolClass
          }
    return studentFilter
  }
}



module.exports = School;
