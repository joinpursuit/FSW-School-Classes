const Class = require('../models/Class');
const Student = require('../models/Student')


class School {
  constructor() {
    this.classes = 
    {
      Transfigurations: {
        name: 'Transfigurations',
        teacher: 'Ms. Minerva McGonagall',
        students:[{name: "Harry Potter", age: 22, city: "Godric Hallows", grade: 86.5, house: "Gryffindor"}, {name: "Penelope Clearwater", age: 23, city: "Oxford", grade: 79.0, house: "Ravenclaw"}, {name: "Ronald Weasley", age: 22, city: "Newcastle", grade: 88.5, house: "Gryffindor"},  {name: "Susan Bones", age: 23, city: "London", grade: 89.0, house: "Hufflepuff"}]
      }
    } 
  };

  class 

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
    return newClass
  }

  /**
   * Enroll student in class
   * 
   * @param {string} className - Name of the class
   * @param {Student} student - Student object
   * @return {Student} Enrolled student
   */
  
  enrollStudent(className, student) {
    let newStudent = new Student(student.name, student.city, student.age, student.grade, student.house)
    this.classes[className]["students"].push(newStudent); 
    return newStudent
  }



  /**
   * Get all students enrolled in a class
   * 
   * @param {string} className - Name of the class
   * @return {Student[]} Array of Student objects
   */
  getStudentsByClass(className) {
    return this.classes[`${className}`]["students"];
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
    let students = this.classes[`${className}`]["students"]
    if (failing && city){
      return students.filter((student) => {
        return (student.grade < 70) && (student.city === city)
      })
    } else if (city){
      return students.filter((student) => {
        return student.city === city
      }) 
    } else if (failing){
      return students.filter((student) => {
        return student.grade < 70
      })
    }
  }
}

module.exports = School;
