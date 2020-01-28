const Class = require('./Class');
const Student = require('./Student')

class School {
  constructor() {
    this.classes = {
      
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
    return newClass;
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
      student = new Student(name, age, city, grade)
      this.classes[className][students].push(student)
  }




  /**
   * Get all students enrolled in a class
   * 
   * @param {string} className - Name of the class
   * @return {Student[]} Array of Student objects
   */
  getStudentsByClass(className) {
    // Your code here
    return this.classes[className]["students"]

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
    let filterArr = []
    // let grade = this.classes[className]["students"]["grade"]
    let cityName = this.classes[className]["students"]["city"]

    filterArr = this.classes.filter(el => {
      return el["students"]
    } )
    if(failing === "true" && city !== ""){
      return filterArr.filter(student => {
        if(city === student.city && student.grade < 70  ) {
          return student
        }
      })
    }else if(failing === "true") {
      return filterArr.filter(student => {
        if(student.grade < 70) {
          return student
        }
      })
    }else if(city !== ""){
      return filterArr.filter(student => {
        if(city === student.city) {
          return student
        }
      })
    }

  }

}

module.exports = School;
