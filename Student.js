class Student {
  constructor(name, age, city, grade) {
    this.name = name
    this.city = city
    this.age = age
    this.grade = grade
  }
  studentInfo(){
    console.log(`name: ${this.name} age: ${this.age} grade: ${this.grade} city: ${this.city} `);
  }
}

module.exports = Student;
