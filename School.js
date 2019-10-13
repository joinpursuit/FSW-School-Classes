const Class = require('./Class');
const Student = require('./Student')

class School {
  constructor() {
    this.classes = {
      //physics: {} Class Object
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
  enrollStudent(className, student) { }




  /**
   * Get all students enrolled in a class
   * 
   * @param {string} className - Name of the class
   * @return {Student[]} Array of Student objects
   */
  getStudentsByClass(className) { }




  /**
   * Get all students that are failing the class, 
   * that is all students who's grade is less than 70
   * 
   * @param {string} className - Name of the class
   * @return {Student[]} Array of Student objects
   */
  getFailingStudents(className) { }




  /**
   * Get all students unique from all classes that 
   * live in a specific city
   *  
   * @param {string} city - Name of the city
   * @return {Student[]} Array of Student objects
   */
  getStudentsByCity(city) { }
}

module.exports = School;
