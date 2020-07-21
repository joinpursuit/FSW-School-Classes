const Class = require('./Class');

class School {
  constructor() {
    this.classes = {
      // className: Class Object
      //   physics: {} 
      //ex:   physics: {name: physics, teacher: John Q, students: [...]} 

    }
  }

  /**
   * Add class to classes
   * 
   * @param {string} name - Name of the class
   * @param {string} teacher - Name of instructor 
   * @return {Class} Class object
   */
  addClass(className, teacherName) {
    // in a school it's possible to have multiples classes of the same name with different teachers
    // if (this.classes[className] && this.classes[className][teacher] === teacherName) {
    if (this.classes[className.toLowerCase()]) {
      return -1 // Class already exists
    }
    let newClass = new Class(className.toLowerCase(), teacherName.toLowerCase());
    this.classes[className.toLowerCase()] = newClass;
    console.log("CLASSES", this.classes)
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
    console.log("ENROLLING", this.classes[className])
    if (!this.classes[className]) {
      return -1 // Class doesn't exist
    }

    if (!student.name || !student.age || !student.city || !student.grade) {
      return -2 // Missing student information
    }

    if (isNaN(student.age) || isNaN(student.grade)) {
      return -3 // Wrong input form
    }

    let allClassStudents = this.classes[className].students;
    for (let enrolledStudent of allClassStudents) {
      console.log(enrolledStudent)
      if (enrolledStudent.name === student.name) {
        enrolledStudent.age = student.age;
        enrolledStudent.city = student.city;
        enrolledStudent.grade = student.grade;
        return student // Updated Student;
      }
    }
    (this.classes[className].students).push(student);
    return student
  }




  /**
   * Get all students enrolled in a class
   * 
   * @param {string} className - Name of the class
   * @return {Student[]} Array of Student objects
   */
  getStudentsByClass(className) {
    if (!this.classes[className]) {
      return -1; // Class doesn't exist
    }
    return this.classes[className].students;
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
    if (!this.classes[className]) {
      return -1; // Class doesn't exist
    }
    let arr = [];
    let tracker = {};

    if (city || failing) {
      for (let studentToCheck of this.classes[className].students) {
        if (city && failing) {
          if (studentToCheck.city === city && studentToCheck.grade < 70 && !tracker[studentToCheck.name]) {
            arr.push(studentToCheck);
            tracker[studentToCheck.name] = true;
          }
        } else {
          if (city) {
            if (studentToCheck.city === city && !tracker[studentToCheck.name]) {
              arr.push(studentToCheck);
              tracker[studentToCheck.name] = true;
            }
          }
          if (failing) {
            if (studentToCheck.grade < 70 && !tracker[studentToCheck.name]) {
              arr.push(studentToCheck);
              tracker[studentToCheck.name] = true;
            }
          }
        }
      }
    } else arr = this.classes[className].students;
    return arr;
  }

}

let newSchool = new School;


module.exports = newSchool;
