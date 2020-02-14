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
    this.classes[name] = newClass;
    
  }
  enrollStudent(className, student) {
    let student = new Student(student.name, student.age, student.city, student.grade);
    this.classes[className]["students"].push(student);
  }
  getStudentsByClass(className) {
    return this.classes.className.students
  }
  /**
   * Get all students and apply filters. If failing = true
   * return all students that are failing the class, 
   * that is all students whose grade is less than 70.
   * If a city is passed return students whose city match
   * the city passed. If both failing and city are passed
   * return students that are failing and that live in the
   * specified city
   * 
   * @param {string} className - Name of the class
   * @param {boolean} failing - Whether to return students that are failing the class or not
   * @param {string} city - Name of the city to match against students
   * @return {Student[]} Array of Student objects
   */
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

let timestamp = new Date().toString()

module.exports = School;
