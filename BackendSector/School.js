const Class = require('./Class');
const Student = require('./Student')

class School {
  constructor() {
    this.classes = {
      "Hellfire" : {
        name: "Hellfire",
        teacher: "Remon",
        students: [{name: "Nilber", age: 15, city: "New York", grade: 50}, {name: "Danielle", age: 15, city: "New York", grade: 100}]
      } 
    }
  }
  addClass(name, teacher) {
    let newClass = new Class(name, teacher)
    if(this.classes[name]){
        let error = {Status:500, message: "Class already exists at NRES"}
        throw error
      }
    this.classes[name] = newClass;
    return newClass
  }
  enrollStudent(className, student) {
    let newStudent = new Student(student.name, student.age, student.city, student.grade);
    if(this.classes[className]["students"].includes(student.name)){
      throw {status:500, message: "Student has already been enrolled for indoctrination"}
    }
    this.classes[className]["students"].push(newStudent);
    return newStudent
  } 
  getStudentsByClassWithFilter(className, city, fail) {
    let studentFilter = [];
    let schoolClass = this.classes[className]["students"]

    if(fail === "true" && city.length !== 0){
      schoolClass.forEach( student => {
        if(student.grade < 70 && student.city === city){
          studentFilter.push(student)
        }
      })
      return studentFilter
    } else if(fail === "false" && city.length !== 0){
      for (let student of schoolClass){
        console.log(student)
        if(student["city"] === city){
          studentFilter.push(student)
        }
      }
      return studentFilter
    } else if(fail === "true" & city.length === 0){
      for (let student of schoolClass){  
        if(student["grade"] < 70){
          studentFilter.push(student)
        }
      }
      return studentFilter
    } else {
        return schoolClass
        }
  }
}

module.exports = School;
