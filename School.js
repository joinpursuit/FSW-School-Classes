const Class = require('./Class');
const Student = require('./Student')
const classes = require('./routes/classes/classes.js')
const students = require('./routes/students/students.js')
//const school = require('express').Router()




class School {
  constructor() {
    this.classes = {
      // className: Class Object
       
        math:{
          name: "math",
          teacher:'Albert',
          students:[]
        }
    }
    
  }

  /**
   * Add class to classes
   * 
   * @param {string} name - Name of the class
   * @param {string} teacher - Name of instructor 
   * @return {Class} Class object
   */
  addClass(name, teacher) {
    let newClass = new Class(name, teacher);
    this.classes[name] = newClass;
    //console.log(newClass);
    return this.classes
    
  }

  /**
   * Enroll student in class
   * 
   * @param {string} className - Name of the class
   * @param {Student} student - Student object
   * @return {Student} Enrolled student
   */
  enrollStudent(className, student) {
    // Your code here

    let newStudent = new Student(student.name,student.city,student.age,student.grade)
    this.classes[`${className}`]["students"].push(newStudent);

    //console.log(newStudent);
    return newStudent
    
    
  }


  /**
   * Get all students enrolled in a class
   * 
   * @param {string} className - Name of the class
   * @return {Student[]} Array of Student objects
   */
  getStudentsByClass(className) {
    // Your code here
    if(this.classes(className)){
      className.push(students)
    }

    if(this.classes[className]){
      return clasName[students]
    }
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
  getStudentsByClassWithFilter(className, failing, city) {
    // Your code here
    
    this.classes[className][student][grade,city]
    student.filter(grade => {
      if(grade < 65){
        failing = grade 
        return className.student.city[grade]
      }
    })
  }

}
let pursuit = new School()
let newStudent = new Student ()
//pursuit.addClass('math','joel null')
// console.log(pursuit.enrollStudent())

module.exports = School;
