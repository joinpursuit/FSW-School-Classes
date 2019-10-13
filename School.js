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
   * @param {array}String className - List of classes to enroll student in 
   * @param {Student} student - Student object
   * @return {Student} Enrolled student
   */
  enrollStudent(classes, student) {
    for(let i = 0; i < classes.length; i++){
      if(!(this.classes[classes[i].class])){
        throw new Error('This class does not exist');
      }
      student.addClassGrade(classes[i].grade, classes[i].class);
      this.classes[classes[i].class].enrollStudent(student);
    }
  }




  /**
   * Get all students enrolled in a class
   * 
   * @param {string} className - Name of the class
   * @return {Student[]} Array of Student objects
   */
  getStudentsByClass(className) {
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
    let allStudentsOfClass = this.classes[className].students;
    let studentsToReturn;
    if(failing && city){
      studentsToReturn = allStudentsOfClass.filter((elem) => {
        return elem.city === city && elem.classGrades[className] <= 60;
      })
      return studentsToReturn
    }
    else if(failing){
      studentsToReturn = allStudentsOfClass.filter((elem) => {
        return elem.classGrades[className] <= 60;
      })
      return studentsToReturn
    }
    else if(city){
      studentsToReturn = allStudentsOfClass.filter((elem) => {
        return elem.city === city;
      })
      return studentsToReturn
    }
    return allStudentsOfClass;


  }

}


module.exports = School;
