class Student {
  constructor(name, age, city, grade) {
    this.name = name
    this.city = city
    this.age = age
    this.grade = grade
  }

  isFailing = () => this.grade < 70;

  matchCity = (city) => this.city.toLowerCase() === city.toLowerCase();
}

module.exports = Student;
