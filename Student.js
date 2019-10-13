class Student {
  constructor(name, age, city) {
    this.name = name
    this.city = city
    this.age = age
    this.classGrades = {};
  }

  addClassGrade(classGrade, className){
  	this.classGrades[className] = classGrade;
  }
}

module.exports = Student;
