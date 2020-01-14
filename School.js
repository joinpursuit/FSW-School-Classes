const Class = require('./Class');
const Student = require('./Student')

class School {
  constructor() {
    this.classes = {
      // className: Class Object
      //   physics: {} 
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
  }

  /**
   * Enroll student in class
   * 
   * @param {string} className - Name of the class
   * @param {Student} student - Student object
   * @return {Student} Enrolled student
   */
  enrollStudent(className, student) {
   this.classes[className] = student
   console.log(this.classes)
   return `${student.name} has been enrolled in ${className}!`
  }




  /**
   * Get all students enrolled in a class
   * 
   * @param {string} className - Name of the class
   * @return {Student[]} Array of Student objects
   */
  getStudentsByClass(className) {
    let students = Object.values(this.classes[className])
    return students
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
    let students = Object.values(this.classes[className])
    students.filter((student) => {
      this.isFailing(student)
      if (student[failing] === true && student[city] == city) {
        return `This is a failing student from ${city}: ${student}`
      } else if (student[city] === city) {
        return student
      } else if (student[failing] === true) {
        return student
      }
    }) 
  }

  isFailing(student) {
    student[failing] = ""
    if (student[grade] > 70) {
      student[failing] = true;
    }
    return student[failing]
  }
}

let testSchool = new School()
let marvin = new Student("Marvin", "25", "Laurelton", 65)

console.log(marvin)
console.log(testSchool.enrollStudent("Physics", marvin))

module.exports = School;
