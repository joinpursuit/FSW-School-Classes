const Class = require('./Class.js');
const Student = require('./Student.js')

class School {
  constructor() {
    this.classes = {
      // className: Class Object
        // physics: {name: "Physics", professor: "Jon A", students: [{name: "Ashya Manning", age: 17, city: "Brooklyn", grade: 86}, {name: "Danielle Cherry", age: 16, city: "Queens", grade: 67}, {name: "Uduakabasi Abasiurua", age: 15, city: "Central Islip", grade: 70}]},
        // english: {name: "English", professor: "Corey L", students: [{name: "Samantha Jiminez", age: 17, city: "Brooklyn", grade: 92}, {name: "Jay Fowler", age: 18, city: "NYC", grade: 100}, {name: "Maria Martinez", age: 16, city: "Brentwood", grade: 59}]} 
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
    this.name = name;
    this.teacher = teacher;
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
    let studentArr = this.classes[className]["students"]
    let {
      name,
      age,
      city,
      grade
    } = student
    
    let newStudent = new Student(name, age, city, grade);
    studentArr.push(student);

    return newStudent;

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
    let currentClass = this.classes[className][students];
    
    if (currentClass["grade"] < 70) {
      return 
    }
  }

}

module.exports = School;
