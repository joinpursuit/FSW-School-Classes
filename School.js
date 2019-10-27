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
  enrollStudent(name, student, city, age, grade) {
    // Your code here
    let newStudent = new Student(student, city, age, grade);
    this.classes[name].students.push(newStudent);
    // console.log(this.classes[name]);
  }

  /**
   * Get all students enrolled in a class
   * 
   * @param {string} className - Name of the class
   * @return {Student[]} Array of Student objects
   */
  getStudentsByClass(className) {
    for(let key in this.classes){
      // console.log('Checking Key', this.classes[key])
      if(this.classes[key].name === className){
        return this.classes[key].students
      }
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
    // I added this and the last function together
  }

}

module.exports = School;
