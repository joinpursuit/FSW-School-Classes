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
  enrollStudent(className, student) {
      if (this.classes[className].students[student.name]){
        return "This student is already enrolled in this class";
      } else {
        this.classes[className].students[student.name] = student;
        // console.log(this.classes[className].students)
        return student;
      }
  }




  /**
   * Get all students enrolled in a class
   * 
   * @param {string} className - Name of the class
   * @return {Student[]} Array of Student objects
   */
  getStudentsByClass(className) {
    return this.classes[className].students
  }

  changeGrade(className, student, grade) {
    if(this.classes[className].students[student.name]) {
      this.classes[className].students[student.name].grade = grade;
      return this.classes[className].students[student.name].grade = grade;

    } else {
      return "This student isn't in this class."
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
  getStudentsByClassWithFilter(className, failing) {
    let studentsObj = this.classes[className].students;
    let failingNum = Number(failing);
    let passingArr = [];
    let failingArr = [];

    for (let i in studentsObj) {
      console.log(studentsObj[i].grade)
      if (Number(studentsObj[i].grade) >= 65) {
        passingArr.push(i);
      } else {
        failingArr.push(i);
      }
    }

    console.log(failingArr, passingArr)
    console.log("typeof failing", typeof failing)
    if (failingNum === 0) {
      return passingArr;
    } 
    return failingArr
}
}

module.exports = School;


// let mySchool = new School();
// let newStudent = new Student("Peter", 25, "NY", 12);
// let mike = new Student("Mike", 25, "NY", 65);
// let tim = new Student("Tim", 25, "NY", 99);

// mySchool.addClass("math", "Alejo");
// mySchool.enrollStudent("math", newStudent)
// console.log(mySchool.classes.math.students)

// mySchool.changeGrade("math", newStudent, "95")
// console.log(mySchool.changeGrade("math", mike, 100))

// console.log(mySchool.enrollStudent("math", newStudent));
// console.log(mySchool.classes.math.students)
// console.log(mySchool.enrollStudent("math", mike));

// console.log(mySchool.classes.math.students)
// console.log(mySchool.enrollStudent("math", tim));
// console.log(mySchool.enrollStudent("math", newStudent));

// console.log(mySchool.getStudentsByClass("math"))

// console.log(mySchool.getStudentsByClassWithFilter("math", true));