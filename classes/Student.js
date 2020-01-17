class Student {
  constructor(name, age, city, grade) {
    this.name = name
    this.city = city
    this.age = age
    this.grade = grade
  }

  isFailing = () => this.grade < 70;

  matchCity = (city) => this.city.toLowerCase() === city.toLowerCase();

  updateInfo = (newStudent) => {
    this.city = newStudent.city;
    this.age = newStudent.age;
    this.grade = newStudent.grade;

  }
}

module.exports = Student;
