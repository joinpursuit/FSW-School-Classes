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
    
    if (failing === true) {
      let failingArr = currClass.filter(el => {
        return (el.grade < 70)
      }) 
      if (city) {
        failingArr = failingArr.filter(el => {
          return (el.city === city)
        })
      }
      return failingArr 
    } else if (failing === false) {
      let passingArr = currClass.filter(el => {
        return (el.grade > 65)
      })
      if (city) {
        passingArr = failingArr.filter(el => {
          return (el.city === city)
        })
      }
      return passingArr 
    }
  }
}

module.exports = School;

// let mySchool = new School()
// let newStudent = new Student("Briany", 22, "New York City", "95")
// let passingNy = new Student("Joshua", 18, "New York City", "63")
// let failingStudent = new Student("Jon", 21, "Boston", "55")
// let passingBoston = new Student("Ben", 24, "Boston", "85")


//mySchool.addClass("Astronomy", "Mr.Bob")


// mySchool.enrollStudent("Astronomy", newStudent)
// mySchool.enrollStudent("Astronomy", passingNy)
// mySchool.enrollStudent("Astronomy", failingStudent)
// mySchool.enrollStudent("Astronomy", passingBoston)

//console.log(mySchool.getStudentsByClass("Astronomy"))

// console.log('getstudents by class with filter function')
// console.log(mySchool.getStudentsByClassWithFilter("Astronomy", true, "Boston"))
