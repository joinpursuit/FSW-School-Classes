const Class = require('./Class');
const Student = require('./Student');

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
       // Your code here
   
    if (!this.classes[className]) {
      console.log("class doesn't exists!!!")
    } else {
      console.log("class exist!!!")
    }
    
    for (let i = 0; i < this.classes[name].students.length; i++) {
    
      if (this.clases[name].student !== student.name) {
        console.log("class name")
      let name = student.name
      let city = student.city
      let age = student.age
      let grade = student.grade
      let newStudent = new Student(name, city, age, grade)
        console.log(newStudent)
       this.student.push(newStudent)
       return newStudent
      
      }
    } 
  
  }

  
    
 
  




  /**
   * Get all students enrolled in a class
   * 
   * @param {string} className - Name of the class
   * @return {Student[]} Array of Student objects
   */
  getStudentsByClass(className) {

    // Your code here
    // if(this.clases[className] === this.student.name) {

    // }
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
  }

}

let mySchool = new School();

module.exports = School;
