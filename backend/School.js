const Class = require('./Class');
const Student = require('./Student')

class School {
  constructor() {
    this.classes = [];
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
  // let mikeStudent = {
  //   name: 'mike',
  //   city: 'ny',
  //   age: '24',
  //   grade: '65',
  // }
  enrollStudent(className, student) {
    console.log('youve reached the schoolsjs enroll student functions')
    // console.log(this.classes[className].student)
    // push students into above ^^^^^

  }



  /**
   * Get all students enrolled in a class
   * 
   * @param {string} className - Name of the class
   * @return {Student[]} Array of Student objects
   */
  getStudentsByClass(className) {
    if(this.classes[className].students === 0) throw {message: "No students in this class", status: 404 }
    return this.classes[className].students
  
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
    if(failing === true) {
      return 
    }
  }

}

module.exports = School;
