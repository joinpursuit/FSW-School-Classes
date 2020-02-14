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
    return this.classes
  }
  enrollStudent(className, student) {
    let student = new Student(student.name, student.age, student.city, student.grade);
    if(this.classes[className]["students"].includes(student)){
      throw {Status:500, Message: "Student has already been enrolled for indoctrination"}
    }
    this.classes[className]["students"].push(student);
    return student
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
