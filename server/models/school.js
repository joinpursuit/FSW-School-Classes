/*
Joseph P. Pasaoa
School model | Express Server Project
*/


/* HELPERS */
const addZero = (component, targetLength) => {
  while (component.toString().length < targetLength) {
    component = "0" + component;
  }
  return component;
}
const customizeDate = (d) => {
  let output = `${addZero(d.getFullYear(), 4)}, ${addZero(d.getMonth() + 1, 2)}/${addZero(d.getDate(), 2)}`;
  output += ` ${addZero(d.getHours(), 2)}:${addZero(d.getMinutes(), 2)}:${addZero(d.getSeconds(), 2)}`;
  return output;
}


/* MODEL */
const Class = require('./class');
const Student = require('./student')

class School {
  constructor() {
    this.classes = {};
  }
  //
  addClass(className, teacherName) {
    const newClass = new Class(className, teacherName);
    this.classes[className.toLowerCase()] = newClass;
    return newClass;
  }
  addStudentToClass(className, ssn, name, age, city, grade) {
    const newStudent = new Student(name, age, city, grade, ssn);
    const classStr = className.toLowerCase();
    this.classes[classStr].index[ssn] = this.classes[classStr].nextIdxAssign;
    this.classes[classStr].nextIdxAssign += 1;
    this.classes[classStr].capacity -= 1;
    this.classes[classStr].students.push(newStudent);
    return newStudent;
  }
  updateStudentInClass(className, ssn, name, age, city, grade) {
    const classStr = className.toLowerCase();
    const idx = this.classes[classStr].index[ssn];
    const student = this.classes[classStr].students[idx];
    student.name = name;
    student.age = age;
    student.city = city;
    student.grade = grade;
    student.entryUpdated.unshift(customizeDate(new Date()));
    return student;
  }
  /* TODO SSN EDIT ROUTE NEEDED
      if (ssn !== student.ssn) { // updates ssn index if necessary
      this.classes[classStr].index[ssn] = idx;
      delete this.classes[classStr].index[student.ssn];
      student.ssn = ssn;
    }
  */
  getStudentsByClass(className) {
    const classStr = className.toLowerCase();
    let roll = this.classes[classStr].students;
    return roll.filter(el => !!el);
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


module.exports = School;
