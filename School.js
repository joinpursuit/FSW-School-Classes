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
    console.log("this classes added", this.classes[name].students)
    // return this.classes
  }

  /**
   * Enroll student in class
   * 
   * @param {string} className - Name of the class
   * @param {Student} student - Student object
   * @return {Student} Enrolled student
   */
  enrollStudent(className, name, age, city, grade) {
    // Your code here
    let newStudent = new Student(name, age, city, grade);
    // console.log("classes", className)
    // console.log("this classes", this.classes)
    this.classes[className].students.push(newStudent);

    // console.log("this classes", this.classes)
    // console.log('here')
    return this.classes
  }

  /**
   * Get all students enrolled in a class
   * 
   * @param {string} className - Name of the class
   * @return {Student[]} Array of Student objects
   */
  getStudentsByClass(className) {
    // Your code here
  let arr = this.classes[className].students
return arr
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
    let stuInClass = this.getStudentsByClass(className)

    const studentArr = stuInClass.filter(student => {
      if(student.grade <= 70 && failing === "true"){
        return student
      }
    
    })
    return studentArr

  }


}

module.exports = School;
