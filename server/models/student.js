/*
Joseph P. Pasaoa
Student model | Express Server Project
*/


/* HELPERS */
const addZero = (component, targetLength) => {
  while (component.toString().length < targetLength) {
    component = "0" + component;
  }
  return component;
}
const customizeTime = (d) => {
  let output = `${addZero(d.getFullYear(), 4)}, ${addZero(d.getMonth() + 1, 2)}/${addZero(d.getDate(), 2)}`;
  output += ` ${addZero(d.getHours(), 2)}:${addZero(d.getMinutes(), 2)}:${addZero(d.getSeconds(), 2)}`;
  return output;
}


/* MODEL */
class Student {
  constructor(name, age, city, grade, ssn) {
    this.name = name;
    this.city = city;
    this.age = age;
    this.grade = grade;
    this.ssn = ssn;
    this.timeEnrolled = customizeTime(new Date());
    this.entryUpdated = [this.timeEnrolled];
  }
}

module.exports = Student;
