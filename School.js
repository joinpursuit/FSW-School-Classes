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
  }

  /**
   * Enroll student in class
   * 
   * @param {string} className - Name of the class
   * @param {Student} student - Student object
   * @return {Student} Enrolled student
   */
  enrollStudent(className, student) {
    let newStudent = new Student(student.name, student.age, student. city, student.grade);
    this.classes[className]["students"].push(student);     
  }




  /**
   * Get all students enrolled in a class
   * 
   * @param {string} className - Name of the class
   * @return {Student[]} Array of Student objects
   */
  getStudentsByClass(className) {
    return this.classes[className]["students"];
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
    if(failing && city) {
      return this.classes[className]["students"].filter((el) => {
        if(el.grade < 70 && el.city === city) {
          return el;
        }
      })
    } else if(failing) {
      return this.classes[className]["students"].filter((el) => {
        if(el.grade < 70) {
          return el;
        }
      })
    } else if(city) {
      return this.classes[className]["students"].filter((el) => {
        if(el.city === city) {
          return el;
        }
      })
    }
  }
}

module.exports = School;
