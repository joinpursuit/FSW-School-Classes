const Class = require('./Class');
const Student = require('./Student')

class School {
  constructor() {
   // this.classes = [] 
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
   // return (`${newClass} ${this.classes}`)
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
    // Your code here
    this.classes[className].students.push(student)
    return student 
  }




  /**
   * Get all students enrolled in a class
   * 
   * @param {string} className - Name of the class
   * @return {Student[]} Array of Student objects
   */
  getStudentsByClass(className) {
    // Your code here
    let studentsArr = this.classes[className].students
    return studentsArr 
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
    let currClass = this.classes[className].students 
    
    if (failing === true && city) {
     let failingAndCity = currClass.filter(el => el.grade < 70 && el.city === city)
     return failingAndCity
    } else if (failing === false && city) {
      let passingAndCity = currClass.filter(el => el.grade >= 70 && el.city === city)
      return passingAndCity
    } else if (failing === true) {
      let failingArr = currClass.filter(el => el.grade < 70)
      return failingArr
    } else if (failing === false){
      let passingArr = currClass.filter(el => el.grade >= 70)
      return passingArr
    } else {
      let cityArr = currClass.filter(el => el.city === city)
      return cityArr
    }
  }

}

module.exports = School;
