/*
Joseph P. Pasaoa
School model | Express Server Project
*/


/* TODO
   edit ssn route
   delete student
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
    const newClass = new Class(className.trim(), teacherName.trim());
    this.classes[className.trim().toLowerCase()] = newClass;
    return newClass;
  }
  addStudentToClass(className, ssn, name, age, city, grade) {
    const newStudent = new Student(name, age, city, grade, ssn);
    const targetClass = className.trim().toLowerCase();
    this.classes[targetClass].index[ssn] = this.classes[targetClass].nextIdxAssign; // creates index entry (ssn: index #)
    this.classes[targetClass].nextIdxAssign += 1;
    this.classes[targetClass].capacity -= 1;
    this.classes[targetClass].students.push(newStudent);
    return newStudent;
  }
  updateStudentInClass(className, ssn, name, age, city, grade) {
    const targetClass = className.trim().toLowerCase();
    const idx = this.classes[targetClass].index[ssn];
    const student = this.classes[targetClass].students[idx];
    student.name = name.trim();
    student.age = age.trim();
    student.city = city.trim();
    student.grade = grade.trim();
    student.entryUpdated.unshift(customizeDate(new Date()));
    return student;
  }
  /* TODO SSN EDIT ROUTE NEEDED
      if (ssn !== student.ssn) { // updates ssn index if necessary
      this.classes[targetClass].index[ssn] = idx;
      delete this.classes[targetClass].index[student.ssn];
      student.ssn = ssn;
    }
  */
  getStudentsByClass(className) {
    const targetClass = className.trim().toLowerCase();
    let roll = this.classes[targetClass].students;
    return roll.filter(student => !!student);
  }
  getStudentsByClassWithFilter(className, failing, city) {
    const targetClass = className.trim().toLowerCase();
    let roll = this.classes[targetClass].students;
    roll = roll.filter(student => {
        if (student) {
          let checkFail = true;
          let checkCity = true;
          if (failing === true) {
            checkFail = student.grade < 70;
          } else if (failing === false) {
            checkFail = student.grade >= 70;
          }
          if (city) {
            checkCity = city.trim().toLowerCase() === student.city.trim().toLowerCase();
          }
          return checkFail && checkCity;
        }
        return false;
    })
    return roll;
  }
}


module.exports = School;
