/*
Joseph P. Pasaoa
Student model | Express Server Project
*/


class Student {
  constructor(name, age, city, grade) {
    this.name = name;
    this.city = city;
    this.age = age;
    this.grade = grade;
  }
}

module.exports = Student;
