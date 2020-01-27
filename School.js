const Class = require('./Class');
const Student = require('./Student')

class School {
  constructor() {
    this.classes = {
      // className: Class Object
        // physics: {name: "Physics", teacher: "Jon A", students: [{name: "Jhenya E", city: "Brooklyn", age:"15", grade: "80" }]} 

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
    let newStudent = new Student(student.className,student.name, student.city, student.age, student.grade)
    console.log(className)
    this.classes[className].students.push(newStudent)
    

  }





  /**
   * Get all students enrolled in a class
   * 
   * @param {string} className - Name of the class
   * @return {Student[]} Array of Student objects
   */
  getStudentsByClass(className) {
    return this.class[className]["students"]
  }




  /**
   * Get all students and apply filters. If failing = true
   * return all students that are failing the class, 
   * that is all students whose grade is less than 70.
   * If a city is passed return students whose city match
   * the city passed. If both failing and city are passed
   * return students that are failing and that live in the
   * specified city
   * @param {string} className - Name of the class
   * @param {boolean} failing - Whether to return stfudents that are failing the class or not
   * @param {string} city - Name of the city to match against students
   * @return {Student[]} Array of Student objects
   */
  getStudentsByClassWithFilter(className, failing, city = "") {
    
    let presentClass = this.class[className]["student"]
    if(failing === true && city){
      presentClass.filter(stud=>{
        return stud.city === city
      })
    } else if(failing === true){
      presentClass.filter(stud =>{
        return stud.grade
      })
   }
  }
}
module.exports = School
let newSchool = new School()
console.log(newSchool)
//newSchool.addClass("math","Kong")
//console.log(newSchool.this.student)

